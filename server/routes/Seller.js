const express = require('express')
const router  = express.Router()
const connectDb = require('../database')


router.get('/:id',(request,response) => {
    
    const TopProducts = ``
    response.send("OK")    
})


module.exports = router

