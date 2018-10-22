const mongoose = require('../database');

const User = mongoose.model('User');
const bcrypt = require('bcryptjs');

const secret = "995bf053c4694e1e353cfd42b94e4447"

const jwt = require('jsonwebtoken');

function generateToken(params = {}){
    return jwt.sign(params ,  secret,  { expiresIn: 86400 });
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
        

}

};