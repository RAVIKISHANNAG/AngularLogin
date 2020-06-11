const express = require ('express');
const router = express.Router();
const users = require("../model/user.js")
const jwt = require('jsonwebtoken');


router.get('/',(req,res)=>{
    res.send('From Api Router')
})

router.post('/register',(req,res)=>{
    console.log("req.body.params", req.body)
    var ip = req.body;
    if(!ip){
        res.status(200).send({status:"error", msg:"All conditions not meet"})
        return;
    }
    users.register(ip,function(err,result){
        if(err){
            res.status(200).send({status:"error", msg:err})
        }else{
            let payload  = {subject: result._id};
            let token = jwt.sign(payload,"secretKey"); // secretkey can be anything
            res.status(200).send({status:"success", msg:{token}})
        }

    })
})

router.post('/login',(req,res)=>{
    var ip = req.body;
    if(!ip){
        res.status(200).send({status:"Error", msg:"All conditions ot met"})
        return;
    }
    users.login(ip,(err,result)=>{
        if(err){
            res.status(401).send({status:"Invalid user or password", msg:err})
        }else if(result._id){
            let payload = {subject: result._id};
            let token = jwt.sign(payload,"secretkey");
            result.token = token;
            res.status(200).send({status:"Success", msg:result})
        }else{
            res.status(401).send({status:"Error",msg:"Invalid user or password"})
        }
    })

})


router.get('/events', (req,res)=>{
    let events =[
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"
        },
        {
            "_id":"2",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"
        },
        {
            "_id":"3",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"
        },
        {
            "_id":"4",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"
        },
        {
            "_id":"5",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"

        },
        {
            "_id":"6",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"

        }]
        res.json(events)

})

router.get('/special', (req,res)=>{
    let events =[
        {
            "_id":"1",
            "name":"special Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"
        },
        {
            "_id":"2",
            "name":"special Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"
        },
        {
            "_id":"3",
            "name":"special Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"
        },
        {
            "_id":"4",
            "name":"special Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"
        },
        {
            "_id":"5",
            "name":"special Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"

        },
        {
            "_id":"6",
            "name":" special Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"

        },
        {
            "_id":"7",
            "name":"special Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"
        },
        {
            "_id":"8",
            "name":"special Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"

        },
        {
            "_id":"9",
            "name":" special Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-06-04"

        }]
        res.json(events)
})
module.exports = router;