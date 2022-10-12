const S = require("sequelize");
const db = require("../db");

class ZonaSegura extends S.Model {
}

ZonaSegura.init(
  {
    centro: {
      type: S.STRING,
    },
    radio: {
      type: S.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "zonasegura",
  }
);


module.exports = ZonaSegura;