const {User,Unidades,Devices,Reportes, ZonaSegura} = require('../models');
const { Op } = require("sequelize");


class AdminServices {
  static async serviceAddVehicle(req, next) {
    const cuit = req.body.cuit;
    const cliente = await User.findOne({ where: { CUIT: cuit } });
    if(!cliente) return {error:true , respuesta:'Cliente inexistente'};
    const device = await Devices.findOne({ where: { imei: req.body.imei } });
    req.body.user_id = cliente.id
    req.body.device_id = device.id
    try{
      const unidad = await Unidades.create(req.body)
      Devices.actualDevice(req.body.imei,false)
      await ZonaSegura.create({
        unidad_id: unidad.dataValues.id,
        centro: null,
        radio: null
      });
      return {error:false,respuesta:'creado'}
    }catch(err){
      return {error:true,respuesta:'Vehiculo existente'}
    }
  }
  static async clientSearch(req, next) {
    let options = {
      email:{
        [Op.substring]: req.body.email,
      },
      fullName:{
        [Op.substring]: req.body.fullName.toLowerCase(),
      },
    }
    req.body.CUIT!==""?options={CUIT:req.body.CUIT}:null
    try {
      const cuit = req.body.cuit;
      const cliente = await User.findAll({
        attributes:['id','fullName','name','CUIT','email','address','status','initDate','endDate'],
        where: options, 
        include : [
          {
            model : Unidades,
            required: false,
            include : [
              {
                model : Devices,
                attributes: ['imei'],
                required: false                      
              }
            ]      
          }]});
      return {error:false,respuesta:cliente};
    } catch (err) {
      return {error:true,respuesta:'Cliente inexistente'};
    }
  }
  static async vehicleSearchDom(req, next) {
    try {
      const dominio = req.body.dominio.toUpperCase();
      const vehiculo = await Unidades.findOne({ 
        where: { patente: dominio },
        include:[{
          model:User,
          attributes:['id','fullName','CUIT','email','address','status','initDate','endDate'],
        }]
      });
      return {error:false , data:vehiculo};
    } catch (err) {
      return {error:true , data:err}
    }
  }

  static async clientModify(req, next) {
    delete req.body.token
    console.log(req.body)
    console.log(req.params.id)
    try{
      const user = await User.findOne({
        where: { id: req.params.id },
        include:[{
          model:Unidades,
          include:[{
            model:Devices,
            attributes:['imei'],
          }]
        }]
      })
      await user.update(req.body,{
        returning: true,
        plain: true
      })
      return {
        error:false,
        response:user
      }
    }catch (err){
      return {error:'true', response:'Ocurrio un error y no actualizó'}
    }
  }
  static async vehicleModify(req, next) {
    try {
      const [rows, update] = await Unidades.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      });
      return update;
    } catch (err) {
      next(err);
    }
  }
  static async addDevice(req, next) {
    try {
      const rastreador = await Devices.create(req.body);
      return rastreador;
    } catch (err) {
      next(err);
    }
  }
  static async availableDevice(req, next) {
    try {
      const disponibles = await Devices.findAll({where : {disponible:true}});
      return disponibles;
    } catch (err) {
      next(err);
    }
  }
}
module.exports = AdminServices;

