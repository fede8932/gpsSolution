const S = require("sequelize");
const db = require("../db");

class Unidades extends S.Model {
}

Unidades.init(
  {
    marca: {
      type: S.STRING,
    },
    modelo: {
      type: S.STRING,
    },
    tipo: {
      type: S.STRING,
    },
    año: {
      type: S.INTEGER,
      isEmail: true,
    },
    patente: {
        type: S.STRING,
        unique : true
    },
    chasis: {
      type: S.STRING,
      unique : true
    },
    motor: {
    type: S.STRING,
    unique : true
    },
    color: {
      type: S.STRING
    },
    status: {
        type: S.BOOLEAN,
        defaultValue: true,
      },
  },
  {
    sequelize: db,
    modelName: "unidades",
  }
);


module.exports = Unidades;