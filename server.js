const express = require('express');
const cors = require('cors');

//iiciando o App
const app = express();
app.use(express.json());
app.use(cors());

require('./src/app/models/Product');
require('./src/app/models/User');

// rota inicial
app.use('/api', require("./src/routes"));

app.listen(3001);