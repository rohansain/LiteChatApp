const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./model/chat.js');
const methodOverride = require('method-override');

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

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

//for editing post
app.get('/chats/:id/edit',async(req,res)=>{
    let {id} = req.params;
    id = id.trim();
    // console.log(id);
    let chat = await Chat.findById(id);
    // console.log(chat);
    res.render('edit.ejs',{chat});
})

//update route
app.put('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let { newMsg } = req.body;
    try {
        let updatedChat = await Chat.findByIdAndUpdate(
            id,
            { msg: newMsg },
            { runValidators: true, new: true }
        );
        console.log(updatedChat);
        res.redirect('/chats');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

//DELETE ROUTE
app.delete('/chats/:id',(req,res)=>{
    res.send("delet");
})
app.listen(8080,()=>{
    console.log("app is listening on port 8080");
})