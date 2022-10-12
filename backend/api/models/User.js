const S = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class User extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

User.init(
  {
    fullName: {
      type: S.STRING,
    },
    name: {
      type: S.DataTypes.VIRTUAL,
      get() {
        const palabras = this.fullName.split(" ");
        for (let i = 0; i < palabras.length; i++) {
          palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substr(1);
        }
        return palabras.join(" ");
      }
    },
    CUIT: {
        type: S.BIGINT,
        unique : true
      },
    email: {
      type: S.STRING,
      isEmail: true,
      unique : true
    },
    address: {
        type: S.STRING,
      },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    recoveryToken: {
    type: S.STRING
    },
    status: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
    initDate: {
        type: S.DATEONLY,
      },
    endDate: {
        type: S.DATEONLY,
    },
    isAdmin: {
        type: S.BOOLEAN,
        defaultValue: false,
    },
    superUser: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

User.beforeCreate(async (user) => {
  const genererSalt = await bcrypt.genSalt(16);
  const hash = await user.hash(user.password, genererSalt);
  return (user.password = hash);
});
User.beforeCreate(async (user) => {
  return (user.fullName = user.fullName.toLowerCase());
});

module.exports = User;