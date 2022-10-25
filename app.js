require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnnectNoSql = require('./config/mongo.js');

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.static('storage'));


const PORT = process.env.PORT || 3000;

app.use('/api', require('./routes'));

app.listen(PORT, () => {
    console.log(`El servidor esta escuchando el puerto ${PORT}`);
});

dbConnnectNoSql();

