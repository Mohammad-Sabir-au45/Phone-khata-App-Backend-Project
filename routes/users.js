const express = require('express')
const userRouter = express.Router()
const {deleteUser, getUsers, loginUser, logoutUser, signupUser ,updateUser} = require('../controllers/users')
const path = require('path')

userRouter.get('/signup',(req,res)=>{
    let pat = path.join(__dirname,'../')
    res.sendFile(`${pat}public/signup.html`)
})

userRouter.get('/login',(req,res)=>{
    let pat = path.join(__dirname,'../')
    res.sendFile(`${pat}public/login.html`)
})

userRouter.get('/logout',(req,res)=>{
    let pat = path.join(__dirname,'../')
    res.sendFile(`${pat}public/logout.html`)
})


// post a user / signup
userRouter.post('/signup',signupUser)

// login user
userRouter.post('/login',loginUser)

//Logout user
userRouter.post('/logout',logoutUser) 

// get all the Users
userRouter.get('/getallusers',getUsers)

// update a user
userRouter.put('/:id',updateUser)

// delete a user
userRouter.delete('/:id',deleteUser)


module.exports = userRouter