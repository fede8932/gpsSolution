const {User,Unidades,Devices,Reportes,ZonaSegura} = require('../models');
const {Op} = require("sequelize");


class searchReportes {
  static async searchReporte(req, next) {
    // console.log('router/controller ok');
    let arrayReportes = []
    try {
      const unidades = await Unidades.findAll({
        attributes:['id','patente','marca','modelo','año'],
        where:{
          user_id:req.params.id
        },
        include:[{
          model:Devices,
          attributes:['id'],
        }],
      });
      // console.log('unidades', unidades);
      await Promise.all(unidades.map(async unidad=>{
        let reporte = {};
          const ultimoId = await Reportes.max('id', {
            where: {
              device_id: unidad.device.id
            },
          });
          if (ultimoId !== null){
          const rep = await Reportes.findOne({
            where:{
              id: ultimoId
            },
            attributes:["fecha","coordenada_x","coordenada_y","latitude","longitude","velocidad","status", "vel"],
          });
          reporte = {... rep.dataValues};
          reporte.unidad = unidad.patente;
          arrayReportes.push(reporte);
        };
      }))
      return arrayReportes;
    } catch (err) {
      next(err);
    }
  }
  static async searchZone(req, next) {
    try {
      const unidad = await Unidades.findOne({
        where:{
          patente:req.params.patente.toUpperCase()
        },
        include:[{
          model:ZonaSegura,
        }],
    });
      return unidad.zonasegura;
    } catch (err) {
      next(err);
    }
  }
  static async editZone(req, next) {
    try {
      const [rows, update] = await ZonaSegura.update(req.body, {
        where: {
          id : req.params.id
        },
        returning: true,
        plain: true,
      });
      return update;
    } catch (err) {
      next(err);
    }
  }
  static async searchReporteByDate(req, next) {
    try {
      const unidad = await Unidades.findOne({
        attributes:['id','patente','marca','modelo','año'],
        where:{
          user_id:req.params.id,
          patente:req.params.patente.toUpperCase()
        },
        include:[{
          model:Devices,
          attributes:['imei','model'],
          include:[{
            model:Reportes,
            attributes:["fecha",'coordenada_x','coordenada_y','latitude','longitude','velocidad','status', 'vel'],
            where:{
              fecha:{[Op.between]: [req.body.init , req.body.end],} //"formato 2022-05-14T21:42:00.000Z"
            }
          }]
        }],
    });
    // console.log(unidad);
      return unidad;
    } catch (err) {
      next(err);
    }
  }

  // static async searchReporte(req, next) {
  //   let reporte = {}
  //   const before = new Date(new Date()-1000*60*5)
  //   console.log(before);
  //   try {
  //     const unidades = await Unidades.findAll({
  //       attributes:['id','patente','marca','modelo','año'],
  //       where:{
  //         user_id:req.params.id
  //       },
  //       include:[{
  //         model:Devices,
  //         attributes:['imei','model'],
  //         include:[{
  //           model:Reportes,
  //           where:{
  //             fecha:{[Op.gt]: before,}
  //           }
  //         }]
  //       }],
  //   });
  //     unidades.map(unidad=>{
  //       if(unidad.device){
  //         reporte[unidad.patente]=unidad.device.reportes.pop()
  //       }
  //     })
  //     return unidades;
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}
module.exports = searchReportes;