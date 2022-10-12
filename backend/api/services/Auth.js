const {User, Unidades} = require('../models');
const jwt = require('jsonwebtoken');
const {compareHash} = require ('../utils/password');
require('dotenv').config();
const jwt_decode = require ('jwt-decode');


class AuthServices {
  static async register(req,next) {
    try {
      await User.create(req.body)
      return {
        response: 'Usuario creado exitosamente'
      };
    } catch (err) {
      next(err);
    }
  }

  static async me(req,next) {
    try {
      // await User.create(req.body);
      return {
        user: req.user,
        response: 'Persistencia de usuario success'
      };
    } catch (err) {
      next(err);
    }
  }

  static async login(data) {
    const { email, pass } = data;
    const user = await User.findOne({
      where:{
        email : email
      },
      attributes:['id', 'fullName', 'email', 'password', 'isAdmin', 'superUser'],
      include:[{
        model: Unidades,
      }]
    })
    if(!user) return {
      error: true,
      response: 'Usuario inexistente'
    }
    const {password, ...usuario} = user.dataValues
    if(await compareHash(pass , password)){
      const token = jwt.sign({usuario} , process.env.JWT_PASS /* , {expiresIn : '2d'} */)
      return {
        error: false,
        response: {id: user.id, fullName: user.fullName, isAdmin: user.isAdmin, superUser: user.superUser, unidades: user.unidades, token: token}
      }
    }else{
      return {
      error: true,
      response: 'Usuario inexistente'
    }
    }
  }

}

module.exports = AuthServices;
