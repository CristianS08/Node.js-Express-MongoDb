require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnnectNoSql = require('./config/mongo.js');
const {dbConnnectMySql} = require('./config/mysql');
const ENGINE_DB = process.env.ENGINE_DB;

const app = express();

app.use(cors());
app.use(express.json()); // Le indicamos a express que puede recibir datos json
app.use(express.static('storage')); // indicamos que podemos utilizar los recursos que estan en la carpeta storage


const PORT = process.env.PORT || 3000;

app.use('/api', require('./routes'));

app.listen(PORT, () => {
    console.log(`El servidor esta escuchando el puerto ${PORT}`);
});

(ENGINE_DB === 'nosql') ? dbConnnectNoSql() : dbConnnectMySql();

