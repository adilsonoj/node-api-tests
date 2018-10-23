const mongoose = require('../../database');
const auth  = require('../../config/auth');
const crypto = require("crypto");

const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../../modules/mailer');

function generateToken(params = {}){
    return jwt.sign(params ,  auth.secret,  { expiresIn: 86400 });
};

module.exports = {

async register(req, res){
    const {email} = req.body;
    try {
        
        if(await User.findOne({email})){
            console.log("achou");
            return res.status(400).send({ error: 'User already exists'});
        }
         

        const user = await User.create(req.body);

        user.password = undefined;
        return res.send({ user, token: generateToken({ id: user.id}) })
     } catch (error) {
         return res.status(400).send({error: 'Registration failed'});
     }   

},

async authenticate(req, res){
    const { email, password } = req.body;

    const user = await User.findOne( { email }).select('+password');

    if(!user)
        return res.status(400).send({ error: 'User not found'});

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password'});

        user.password = undefined;

        //const token = generateToken({ id: user.id});

        res.send({ user, token: generateToken({ id: user.id}) })
        

},

async forgotPassword(req, res){
    const { email } = req.body;
   
    try {
        const user = await User.findOne({ email });
        
        if(!User) 
            return res.status(400).send({ error: 'User not found'});

        //criar token para trocar senha
        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set':{
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });
        console.log(token);
        mailer.sendMail({
            to: email,
            from: 'adilsonoj@yahoo.com.br',
            template: '/forgot_password',
            context: {token}
        }, (err)=>{
            if (err)
            return res.status(400).send({ error: 'Cannot send forgot password email'});

            return res.send();
        });

    } catch (error) {
        return res.status(400).send({ error: 'Error on forgot password, try again'});
    }
},

async resetPassword(req, res){
    const { email, token, password }  = req.body;

    const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');
        
    if(!User) 
        return res.status(400).send({ error: 'User not found'});

    if(token != user.passwordResetToken)
        return res.status(400).send({ error: 'Token invalid'});

    const now = new Date();
    if(now > user.passwordResetExpires)
        return res.status(400).send({ error: 'Token expired, gernerate a new one'});

    user.password = password;

    await user.save();

    return res.send();

    try {
        
    } catch (error) {
        return res.status(400).send({ error: 'Cannot send forgot password email'});

    }
}

};