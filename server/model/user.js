const config = require('../config.json')
const databae = require('./database');
let sequence = require('sequence').Sequence;


exports.register= function(ip,cb){
    var db;
    var seq = sequence.create().then(function(next){
        databae.getdb(function(err,dbref){
            if(err){
                console.log("Error while gettin connection", err)
                process.exit(1)
            }else{
                console.log("got db")
                db= dbref
                next()
            }

        })
    }).then(function(next){
        db.users.save(ip,function(err,res){
            if(err){
                cb(err,null)
            }else{
                cb(null,res)
            }
        })

    })


}

exports.login = function(ip,cb){
    var db;
    var seq = sequence.create()
    .then(function(next){
        databae.getdb(function(err,dbref){
            if(err){
                console.log("Something wrong while connecting to db")
                process.exit(1);
            }
            db= dbref;
            next()
        })
    }).then(function(next){
        db.users.findOne({email : ip.email,password: ip.password}, (err,res)=>{
            console.log("user.js LOGIn", err,res)
            if(err ){
                cb(err, null)
            }else if (res && res._id){
                cb(null,res)
            }else{
                cb(null,"invalid user or password")
            }

        })
    })


    
}