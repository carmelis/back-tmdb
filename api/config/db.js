const Sequelize = require("sequelize");
//ACORDATE QUE PARA BUSCAR EN LA BASE DE DATOS TENES QUE PONER SELECT * FROM "Users"; Users con mayuscula y entre comillas
const db = new Sequelize('practica', null, null,{
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

module.exports = db;

    