const express = require('express');
const cors = require('cors');
//const mongoose = require('mongoose');

//const bodyParser = require('body-parser');

//require('./src/database')

//iiciando o App
const app = express();
app.use(express.json());
app.use(cors());

/* */



require('./src/models/Product');
require('./src/models/User');

//require('./src/controllers/AuthController'); */


// rota
app.use('/api', require("./src/routes"));


app.listen(3001);