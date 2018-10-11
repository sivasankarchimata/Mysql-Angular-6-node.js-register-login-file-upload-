const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken')

var connection = require('../db.js'); 


//checking
router.get('/', (req, res, next) => res.send('API Hello World!'));

//Get user
router.get('/users', (req,res)=>{
  connection.query('SELECT * FROM user', (err, rows, fields) => {
      if(!err)
          res.send(rows); 
      else 
          console.log(err);
  })
});


function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/events', (req,res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(specialEvents)
})

router.post('/register', (req, res) => {
  let userData = req.body;
  console.log(userData);
  var userName = userData.username;
  var firstName = userData.firstName;
  var lastName = userData.lastName;
  var password = userData.password;
  var address_type = userData.addressType;
  var expiry_date = userData.expiryDate;
  var street_address= userData.streetAddress;
  var state = userData.state;
  var city = userData.city;
  var zip_code = userData.zipcode;
  var fruits = userData.control;
  var sql = "INSERT INTO user ( username, password, firstname, lastname, address_type, expiry_date, street_address, state, city, zip_code, fruits) VALUES ( '"+userName+"', '"+password+"', '"+firstName+"', '"+lastName+"', '"+address_type+"', '"+expiry_date+"', '"+street_address+"', '"+state+"', '"+city+"', '"+zip_code+"', '"+fruits+"'   )";
  connection.query( sql , (err, rows, fields) => {       
    if (err) {
      console.log(err);
      return res.status(500).send( {'error' :'Sorry username does not exits'} );   
    } else {
      // let payload = {subject: registered.User._id}
      // let token = jwt.sign(payload, 'secretKey')
      // res.status(200).send({token})
      return res.status(200).send( {'success' :'login successful '} );
    }
  })
});

// login api 
router.post('/login', (req, res) => {
  let userData = req.body;
  var userName  = userData.userName;
  var Password = userData.password;
  console.log(userData);
  //User.findOne({email: userData.email}, (err, user) => {
  //var sql="SELECT * FROM user WHERE userName ='"+userName+"'";
  connection.query('SELECT * FROM user WHERE username = ?',[userName], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send( {'error' :'Sorry username does not exits'} );    
    } else {
      if (rows.length >0) {
        if ( rows[0].password == Password) {
          // debugger
          // let payload = {subject: user._id}
          // let token = jwt.sign(payload, 'secretKey')
          // return res.status(200).send({token});
          return res.status(200).send( {'success' :'login successful '} );
        } else {
            return res.status(401).send({ 'error': 'Invalid Password' });  
        }
      } else{
          return res.status(404).send('Sorry username does not exits');        
      }   
    }
  });
});

router.get('/states', (req,res)=>{
  connection.query('SELECT * FROM states', (err, rows, fields) => {
    if(!err){
      // res.send(rows);
      return res.status(200).send(rows);
    } else {
        console.log(err);
        return res.status(404).send('Sorry state does not exits');
    }
  })
});

router.get('/cities/:selectedState_id', (req,res)=>{
  connection.query('SELECT * FROM cities WHERE state_id = ?', [req.params.selectedState_id], (err, rows, fields) => {
    if(!err){
      // res.send(rows);
      // debugger
      return res.status(200).send(rows);
    } else {
        console.log(err);
        return res.status(404).send('Sorry state_id does not exits');
    }
  })
});

router.get('/fruits', (req,res)=>{
  connection.query('SELECT * FROM fruits', (err, rows, fields) => {
    if(!err){
      // res.send(rows);
      return res.status(200).send(rows);
    } else {
        console.log(err);
        return res.status(404).send('Sorry state does not exits');
    }
  })
});
















module.exports = router;