
const mongoose = require('mongoose')


const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true
    },    
    email:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    shopkeeper_id:[{  // should be a array
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
},              
);  

//collectionName, Schema
const customerModel = mongoose.model('custumers', customerSchema)

module.exports = customerModel