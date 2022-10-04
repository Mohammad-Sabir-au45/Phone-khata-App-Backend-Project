const userModel = require("../models/users")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const getUsers = async(req,res)=>{
try{
   const users = await userModel.find();
   res.send({status : 'success' , users})
}
catch(err){
   res.status(500).send({status : 'Error' , msg: 'error fetching USER    '})
}
}


const updateUser = async(req,res)=>{
const {id} = req.params
const updatedata = req.body
try{
 const newData = await userModel.findByIdAndUpdate(id, updatedata, { new: true, runValidators: true })
 res.send("Update successfully")
}catch{
    res.status(500).send({status : 'error', msg: "Error in updating user"})
}
}



const deleteUser = async(req,res)=>{
const {id} = req.params
try{
 const Deleteuser = await userModel.findByIdAndDelete(id)
 res.send({status : "Delete Successfylly"})
}catch{
    res.status(500).send({status : 'error', msg: "Error in deleting user"})
}
}



const loginUser = async (req,res)=>{
    const { email , password } = req.body
    const hashedPass = await bcrypt.hash(password, 5)
    try{
        const user = await userModel.findOne({email,hashedPass})
        if(!user){
            res.status(401).send({status: 'error', msg: 'user not found'})
        }
        // user is verified

        const userPayload = { email }

        const token = jwt.sign(userPayload,process.env.AUTH_SECRET_KEY, { algorithm: 'HS384', expiresIn: '1d' })
        res.cookie('jwt',token,{maxAge: 900000})
        res.send('Login Successfully')
       
        // res.send({status: 'success' , user})
    }catch(err){
        res.status(401).send({ status: 'error', msg: err })
    }
}



const signupUser = async (req, res) => {

    const { name, phone_number, email,description, password,user_id } = req.body
      const hashedPass = await bcrypt.hash(password, 5)
        try {
          const newUser = await userModel.create({ name,phone_number, email,description, password: hashedPass , user_id})
          res.redirect('/login')
         // res.send({ status: 'success', user: newUser })
        } catch (err) {
          res.status(500).send(err)
        }
      }



const logoutUser = async(req, res)=>{
res.cookie('jwt','',{maxage: 3000})
res.send({status: 'succes', msg: 'Log out Successfully'})
}



module.exports = {
deleteUser,
getUsers,
loginUser,
signupUser,
logoutUser,
updateUser
}