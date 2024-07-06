const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./model/chat.js');
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

main().then((res)=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get('/',(req,res)=>{
    res.send("root working properly");
})

let chat1 = new Chat({from:'rohan',to:'umangana',msg:'i miss you so much',created_at:new Date()});

chat1.save();

app.listen(8080,()=>{
    console.log("app is listening on port 8080");
})