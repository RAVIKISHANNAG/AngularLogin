'use strict'

const database ={};
const mongodb = require('mongodb')
const config = require('../config.json');
let dbref = null;

database.getdb= function(next){
    if(!dbref){
        mongodb.MongoClient.connect(config.dburl, function(err,client){
            if(err){
                console.log("Unable to connect database!!!", err)
                next(err,null)
            }else{
                const db = client.db("userevent");
                dbref={
                    db:db,
                    users: db.collection('users')
                };
                db.collection('users').createIndex({"email":1},{unique:true}, function(err){
                    if(err){
                        console.log("ERROR","Unable to create unique Index for user ");
                    }
                })
            }
        })
    }else{
        next(null,dbref);
    }
}

module.exports= database;