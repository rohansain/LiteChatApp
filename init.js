const mongoose = require('mongoose');
const Chat = require('./model/chat.js');

main().then((res)=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    { from: 'Alice', to: 'Bob', msg: 'Hello!', created_at: new Date() },
    { from: 'Bob', to: 'Alice', msg: 'Hi there!', created_at: new Date() },
    { from: 'Charlie', to: 'David', msg: 'How are you?', created_at: new Date() },
    { from: 'David', to: 'Charlie', msg: 'I am good, thanks!', created_at: new Date() },
    { from: 'Eve', to: 'Frank', msg: 'What\'s up?', created_at: new Date() },
    { from: 'Frank', to: 'Eve', msg: 'Nothing much.', created_at: new Date() },
    { from: 'Grace', to: 'Heidi', msg: 'Long time no see!', created_at: new Date() },
    { from: 'Heidi', to: 'Grace', msg: 'Yeah, it\'s been a while!', created_at: new Date() },
    { from: 'Ivan', to: 'Judy', msg: 'Let\'s catch up soon.', created_at: new Date() },
    { from: 'Judy', to: 'Ivan', msg: 'Definitely!', created_at: new Date() }
];

Chat.insertMany(allChats);