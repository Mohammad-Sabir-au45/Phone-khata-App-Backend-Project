const express = require('express')
const paymentRouter  = express.Router()

const { getPayments, getPaymentByid,  updatePayment,postPayment} = require('../controllers/payments')
const { authMiddleware } = require('../middleware/auth')

const path = require('path')

 paymentRouter.use(authMiddleware)


    //
    paymentRouter.get('/',(req,res)=>{
        let pat = path.join(__dirname,'../')
        console.log(pat);
        res.sendFile(`${pat}public/paymentsAdding.html`)
    })

    
    //Add payment route
    paymentRouter.post('/', postPayment)
    
    //Find a payment on the basis of  ID
    paymentRouter.get('/:payment_id' ,getPaymentByid)
    
    //Find all payments
    paymentRouter.get('/getPayments',getPayments)
        
    //Update payments
    paymentRouter.put('/:payment_id' , updatePayment) 
    
    //Exporting the router module
    module.exports = paymentRouter
    