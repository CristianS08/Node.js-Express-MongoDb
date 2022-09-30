const {Sequelize} = require('sequelize');

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect: 'mysql'
    }
);

const dbConnnectMySql = async () => {
    try {
        await sequelize.authenticate();
        console.log('MYSQL Conexion correcta');
    } catch (err) {
        console.log('MYSQL Error en la conexion', err);
    }
};

module.exports = {sequelize, dbConnnectMySql};