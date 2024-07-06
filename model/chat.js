const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
        maxlength:50,
    },
    created_at:{
        type:Date,
        required:true,
    }
});

const Chat = mongoose.model("chat",chatSchema);

module.exports = Chat;