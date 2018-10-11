console.log('welcome node server ');

//const http = require('http');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const mysql  = require('mysql');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000;
const cors = require('cors')
// app.use(cors())
app.use(cors({origin: "http://localhost:4200",credentials: true }));

const api = require('./routes/api');


var fileRoutes = require('./file.js');

var connection = require('./db.js'); 
app.use('/file',fileRoutes);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Router checking in router file 
app.use('/api', api);










//checking
app.get('/', (req, res, next) => res.send('Hello World!'));



app.listen(port, () => console.log(`Node app listening on port ${port}!`));










// Code Ends









