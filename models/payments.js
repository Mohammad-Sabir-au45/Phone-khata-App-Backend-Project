const  mongoose  = require("mongoose")
const paymentSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    totalAmmount :{
        type:Number
    },
    debit:{
        type:Number
    },    
    credit:{
    type:Number
   },    
   description:{
       type: String,
       required:true
   },  
   date_of_transaction:{
    type:Date,
    required:true,    
    default: Date.now
},    
customer_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'custumers'

}
})

const paymentModel = mongoose.model('payments',paymentSchema)
module.exports = paymentModel
