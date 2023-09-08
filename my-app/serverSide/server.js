const express = require('express')
const cors = require("cors")
const bodyParser = require('body-parser')
const mongoose = require('mongoose'); //step 1
//step 2 start mongodb server which is mongodbcompass


//step 3 start
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Mydb');
  console.log("db-connected")
}//step 3 end

const userSchema = new mongoose.Schema({ //defining schema
    username: String,
    password:String
  });

const User = mongoose.model('User', userSchema); //will create a table(collection) named User

const Port = 8000;
const server = express();
server.use(cors())
server.use(bodyParser.json())


server.post("/addData",async (req,res)=> {
    let user = new User(); 
    user.username = req.body.username; //assign value from frontend to backend
    user.password = req.body.password;
    const doc = await user.save();
    console.log(doc)
    res.json(doc)
})

server.get("/getData", async (req,res)=>{
    const docs = await User.find({})
    res.json(docs);
})

server.listen(Port,()=>{console.log(`server is running on port : ${Port}`)})