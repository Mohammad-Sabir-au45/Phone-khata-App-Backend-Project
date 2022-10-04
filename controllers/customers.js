const customerModel = require('../models/customers')

const getCustomer = async (req, res) => {
// check authrization here            
  try {
    const customers = await customerModel.find();
    res.send({ status: 'success', customers })
  } catch (err) {
    res.status(500).send({ status: 'error', msg: 'error fetching customers' })
  }
}


const getCustomerByID = async (req, res) => {
  const { customer_id } = req.params

  try  {
    const customer = await customerModel.findById(customer_id)
  if (customer) {
    res.send(customer)
  } else {
    res.status(404).send({ status: 'error', msg: 'Not found' })
  }
}
  catch(error){
    res.status(404).send({ status: 'error', msg: 'Not found' })
  }
}




const postCustomer = async (req, res) => {
  const CustomerData = req.body
  try {
    const result = await customerModel.create(CustomerData)
    res.status(200).send(result)
  } catch (err) {
    console.log(err)
    res.status(500).send("There is some error plz try agian")
  }

}


const updateCustomerByID = async (req, res) => {

  const { customer_id } = req.params
  const updatedCustomerData = req.body //{language, name, id}

  try {
    const updatedResult = await customerModel.findByIdAndUpdate(customer_id, updatedCustomerData, { new: true, runValidators: true })
    res.send(updatedResult)
  } catch (err) {
    console.log(err)
    res.status(500).send("There is some error plz try agian")
  }
}


const deleteCustomerByID = async (req, res) => {
  const { customer_id } = req.params

  try
  {
    const deletedData = await customerModel.findByIdAndDelete(customer_id)
  res.send(deletedData)
}
catch (err) {
  console.log(err)
  res.status(500).send("There is some problem please try again")
}
}


module.exports = {
  getCustomer,
  getCustomerByID,
  postCustomer,
  updateCustomerByID,
  deleteCustomerByID
}