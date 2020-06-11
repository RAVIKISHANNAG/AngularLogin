const express = require ('express');
const bodyPaser =  require('body-parser');
const PORT = 3000;
const app = express();
const api = require('./routes/api');
const cors = require('cors')


app.use(cors())
app.use(bodyPaser.json({}));

app.use('/api', api);

app.get('/', function(req,res){
    res.send("Hello from server");

})

app.listen(PORT, function(){
    console.log("Sever is ruuning in  " + PORT);
})