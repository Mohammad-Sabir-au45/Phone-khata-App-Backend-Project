const paymentModel = require('../models/payments')

const getPayments = async (req, res) => {

  try {
    const payments = await paymentModel.find();
    res.send({ status: 'success', payments })
  } catch (err) {
    res.status(500).send({ status: 'error', msg: 'error fetching payments' })
  }
}


const getPaymentByid = async (req, res) => {
  const { payment_id } = req.params

  try  {
    const payment = await paymentModel.findById(payment_id)
  if (payment) {
    res.send(payment)
  } else {
    res.status(404).send({ status: 'error', msg: 'Not found' })
  }
}
  catch(error){
    res.status(404).send({ status: 'error', msg: 'Not found' })
  }
}



const postPayment = async (req, res) => {
  const paymentData = req.body
  try {
    const result = await paymentModel.create(paymentData)
    res.status(200).send(result)
  } catch (err) {
    console.log(err)
    res.status(500).send("There is some error plz try agian")
  }

}


const updatePayment = async (req, res) => {

  const { payment_id } = req.params
  const updatePaymentHistry = req.body //{language, name, id}

  try {
    const updatedResult = await paymentModel.findByIdAndUpdate(payment_id, updatePaymentHistry, { new: true, runValidators: true })
    res.send(updatedResult)
  } catch (err) {
    console.log(err)
    res.status(500).send("There is some error plz try agian")
  }
}


module.exports = {
  getPayments,
  getPaymentByid,
  updatePayment,
  postPayment
}