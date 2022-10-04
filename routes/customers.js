const express = require('express')
const customerRouter = express.Router()
const { getCustomer, getCustomerByID, postCustomer,  updateCustomerByID, deleteCustomerByID} = require('../controllers/customers')
const path = require('path')

const { authMiddleware } = require('../middleware/auth')

// This is for authentication
customerRouter.use(authMiddleware)


customerRouter.get('/',(req,res)=>{
    let pat = path.join(__dirname,'../')
    res.sendFile(`${pat}public/customerAdding.html`)
})


//Add customer route
customerRouter.post('/', postCustomer)

//Find a customer on the basis of customer ID
customerRouter.get('/:customer_id' ,getCustomerByID)

//Find all customers
customerRouter.get('/allCustomers',getCustomer)

//Update info of the customer
customerRouter.put('/:customer_id' , updateCustomerByID) 

//Delete the info of the customer on the basis of customer_id
customerRouter.delete('/:customer_id' , deleteCustomerByID )


//Exporting the router module
module.exports = customerRouter