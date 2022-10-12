const S = require("sequelize");
const db = require("../db");

class Reportes extends S.Model {
}

Reportes.init(
  {
    status: {
      type: S.BOOLEAN,
    },
    velocidad: {
        type: S.STRING,
      },
    coordenada_x: {
      type: S.STRING,
    },
    coordenada_y: {
        type: S.STRING,
      },
    fecha: {
        type: S.DATE,
      },
    latitude: {
      type: S.DataTypes.VIRTUAL,
      get() {
        const lat = Number(this.coordenada_x);
        return lat
      }
    },
    longitude: {
      type: S.DataTypes.VIRTUAL,
      get() {
        const lon = Number(this.coordenada_y);
        return lon
      }
    },
    vel: {
      type: S.DataTypes.VIRTUAL,
      get() {
        const velNumber = this.velocidad ? this.velocidad.replace(/[^0-9]+/g, "") : null;
        return velNumber
      }
    },
  },
  {
    sequelize: db,
    modelName: "reporte",
  }
);


module.exports = Reportes;