const jwt = require('jsonwebtoken');
const moment = require('moment');
require('dotenv').config();

const secret = process.env.JWT_PASS

function isAuth (req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message:"No tienes autorización"})
    }
    const token= req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(404);
        if(user.exp <= moment().unix()){
            return res.status(401).send({message:'Sesión expirada'})
        }
        req.user = user.usuario;
        next();
     });
}

function isAdmin (req, res, next){
    const {isAdmin , superUser} = req.user
    if(isAdmin || superUser){
        next()
    }else{
        return res.status(403).send({message:"No tienes autorización"})
    }
}

function isSuperUser (req, res, next){
    console.log(next())
    // if(!req.headers.authorization){
    //     return res.status(403).send({message:"No tienes autorización"})
    // }
    // const token= req.headers.authorization.split(' ')[1];
    // const {usuario, ...more} = jwt.decode(token);
}

module.exports = { isAuth , isAdmin , isSuperUser };