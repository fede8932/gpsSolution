const Sequelize= require("sequelize")
require('dotenv').config();

const db = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS, {
   host: process.env.DB_HOST,
   port:process.env.DB_PORT,
   dialect: "postgres",
   dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    }
  },
   logging: false,
 });
 
 module.exports = db;