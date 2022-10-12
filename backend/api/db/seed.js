const db = require("./index");
const { User } = require("../models");
const superUser = require("../utils/superAdmin");
// const unidades = require("../utils/unidades");
// const device = require("../utils/device");

const setupSeed = async () => {
  console.log("SEED STARTING");
  const users = await User.bulkCreate(superUser);
  // const dispositivos = await User.bulkCreate(device);
  // const vehiculos = await User.bulkCreate(unidades);
  return Promise.all([users]);
};

db.sync({ force: true })
  .then(setupSeed)
  .then(() => {
    console.log("Seed succesfully");
    process.exit(0);
  })
  .catch((err) => {
    console.log("Somethin went wrong on the seed process", err.message);
    process.exit(1);
  });
