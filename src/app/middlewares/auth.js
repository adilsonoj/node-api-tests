const jwt  = require('jsonwebtoken');
const auth  = require('../../config/auth');


module.exports = (req, res, next)=> {
    //atributo autorizaçao do cabeçalho http
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ error: 'no token provided'});

        const parts = authHeader.split(' ');

        if(!(parts.length === 2))
            return res.status(401).send({error: 'Token error'});
        
        const [ scheme, token ]=  parts;

        if (!/Bearer$/i.test(scheme))
            return res.status(401).send({ error: 'Token malformatted'});

    jwt.verify(token, auth.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token invalid'});

        //retorna o id para o controller
        req.userId = decoded.id;

        return next();
    })

};