var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
var connection = require('./db.js'); 


var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});


var upload = multer({storage:store}).single('file');

_router.post('/upload',  function(req,res,next){
    upload(req, res, function(err){
        if(!res){
            return res.status(501).json({error:err});
        } else {
             //let usr=req.body;
            console.log(req.body);
            var file_name = req.file.originalname;
            var type = req.file.mimetype;
            var size = req.file.size;
            var tmp_name = req.file.filename;
            var sql = "INSERT INTO files ( file_name, type, size, tmp_name) VALUES ( '"+file_name+"', '"+type+"', '"+size+"', '"+tmp_name+"' )";
           connection.query( sql , (err, rows, fields) => {
            if(!err){
                // res.status(201).send(rows);
                console.log('Insert Query success');
                return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
           } else{
                console.log('Error in Insert Query');
                // console.log(err);
             }

            //do all database record saving activity
            // return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
            });
        }
    });
});


_router.post('/download', function(req,res,next){
    filepath = path.join(__dirname,'./uploads') +'/'+ req.body.filename;
    res.sendFile(filepath);
});

module.exports = _router;





/**
 
// For size limit 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    limits: {
        fileSize: 1024 * 1024 //1MB
    }
});

----------
var limits = { fileSize: 1024 * 1024 * 1024 }
var upload = multer({ limits: limits })

app.post('/upload', upload.single('file'), function (req, res) {
  res.send({ result: 'ok' })
})

app.use(function (err, req, res, next) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.send({ result: 'fail', error: { code: 1001, message: 'File is too big' } })
    return 
  }

  // Handle any other errors
})
The fileSize limit will automatically remove the file if it received a too large file, read more in the readme :)


*/

/*
 var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});


var upload = multer({storage:store}).single('file');

_router.post('/upload', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});


_router.post('/download', function(req,res,next){
    filepath = path.join(__dirname,'./uploads') +'/'+ req.body.filename;
    res.sendFile(filepath);
});

 */


















