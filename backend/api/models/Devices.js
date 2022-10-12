const S = require("sequelize");
const db = require("../db");

class Devices extends S.Model {
  static actualDevice = async (imei,status)=>{
    const [rows, device] = await Devices.update({disponible : status}, {
      where: {
        imei: imei,
      },
      returning: true,
      plain: true,
    });
  }
}

Devices.init(
  {
    imei: {
      type: S.STRING,
      unique:true,
    },
    marca: {
      type: S.STRING,
    },
    model: {
      type: S.STRING,
    },
    status: {
        type: S.BOOLEAN,
        defaultValue: true,
      },
    disponible: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    modelName: "device",
  }
);


module.exports = Devices;