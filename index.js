const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./model/chat.js');
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
main().then((res)=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get('/',(req,res)=>{
    res.send("root working properly");
})

app.get('/chats',async (req,res)=>{
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
})

app.post('/chats',(req,res)=>{
    let {sender,msg,receiver} = req.body;
    let chat = new Chat({from:sender,to:receiver,msg:msg,created_at:new Date()});
    chat.save().then((data)=>{
        // console.log(data);
    }).catch((err)=>{
        console.log(err._message);
    })
    res.redirect("/chats");
})
app.get('/chats/new',(req,res)=>{
    res.render("new.ejs");
})

app.listen(8080,()=>{
    console.log("app is listening on port 8080");
})