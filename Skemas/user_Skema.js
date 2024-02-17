const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({

    userName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
    },
    ProfilePhotoUrl: {
        type: String,  
    },
    AuthId: {
        type: String,
        required: true
    },
    views:{
        type:Number,
        required:false,
        default:0
    },
    folderId: {
        type: String,
    },
    paymentId: {
        type: String,
    },
    notifications: [String],
    History: [String],
    PostsIds: [String],
    phoneNumber:{
        type: String,
        
    },
    showAccountPerfomance:{
        type:Boolean,
        required:true,
        default:true
    },
    resetPin:{
        type:Number,
        required:true,
        default:0
    },
    AccountActivated:{
        type:Boolean,
        required:true,
        default:false
    },
    Date:{
        type: Date,
        required: true,
        default:Date.now

    }

})

const UserModel=mongoose.model('users',UserSchema);
module.exports=UserModel;