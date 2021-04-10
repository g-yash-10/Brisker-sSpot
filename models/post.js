const mongoose=require('mongoose');


const PostSchema=new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
}, { timestamps: true});

const post = mongoose.model('post',PostSchema );
module.exports=post;
