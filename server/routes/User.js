const express = require('express')
const router = express.Router()
const connectDb = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
router.post('/register',(request,response) => {

    const {username,email,password,password2} = request.body
    
    const passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    
    if(!password || !username || !email) {
        return response.status(403).json({
            error: "Please fill all fields"
        })
    }else if (password.length < 6) {
        return response.status(403).json({
            error: "Password must be Atleast 6 Characters"
        })
    }else if (password !== password2) {
        return response.status(403).json({
            error: "Password do not match"
        })
    }else if (!password.match(passwordCheck)) {
        return response.status(403).json({
            error: "Password should have 1/numeric 1/Uppercase  1 lowercase"
        })
    }
    
    const checkUser = `SELECT * FROM user WHERE username = ? OR email = ?`;

    connectDb.query(checkUser,[username,email],(err,result) => {
        if(err) {
            return response.status(400).send({error: "Internal Server Error Mysql"})
        }else {

            if(result.length > 0) {
                console.log(result[0])
                const existingData = result[0].email === email ? "Email" : "Username"
                return response.status(403).json({error: `${existingData} Already Exist`})
            }else {
                bcrypt.hash(password,10,(err,hashedPassword) => {
                    if(err) {
                        return response.status(500).json({error: "Bcrypt Error"})
                    }
                    const CreateUser = `INSERT INTO user (username,email,password) values (?,?,?)`
                    connectDb.query(CreateUser,[username,email,hashedPassword] , (err,result) => {
                        if(err) {
                            return response.status(500).json({error: "INTERNAL SERVER ERROR"})
                        }else {
                            return response.status(200).json({success: "Account Successfully Created"})
                        }
                    })
                })
            }

        }
    })
})


router.post('/login',(request,response) => {
    const {username,password} = request.body
    const isUserExist = `SELECT * FROM user WHERE username = ? `
    connectDb.query(isUserExist,[username] , (err,result) => {

        if(err) {
            return response.status(500).send({error: "Internal Server Error Mysql"})
        } else {
            if(result.length !== 0){
                const hashedPassword = result[0]['password']
                bcrypt.compare(password,hashedPassword,(err,bcryptResult) => {
                    if(err) {
                     return response.status(500).send({error: "Internal Server Error"})
                    } else{
                        if(bcryptResult === false) {
                            return response.status(403).json({error: "Invalid Password"})
                        }
                    // password is match
                    const token = jwt.sign(
                        {
                        userId: result[0].id,
                        email: result[0].email,
                        username: result[0].username,
                        },
                        'SECRET KEY',
                        {expiresIn: '1d'}
                    )
                    response.cookie("token",token)
                    console.log(token)
                    return response.status(200).json({success:true})
                    }
                })
            }else{
                return response.status(404).json({error:"Invalid Credentials"})
            }
        }
    })
})

module.exports = router