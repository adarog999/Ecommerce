const express = require('express')
const router = express.Router()
const connectDb =require('../database')

router.post('/:id',(request,response) => {
    const {order,userinfo} = request.body
    const {first_name,last_name,address,contact} = request.body.userinfo
    const {id} = request.params
    let orders = order.map(key => {
        return [
            id,
            first_name,
            last_name,
            address,
            contact,
            key.item_quantity,
            parseInt(key.item_quantity) * parseInt(key.price),
            JSON.stringify(key.choosen_variant),
            key.id
        ]})
    const AddOrder = `INSERT INTO orders (user,first_name,last_name,address,contact,quantity,total,variant,product) values ?`
    connectDb.query(AddOrder,[orders],(err,result) => {
        if(err) {
            console.log(err)
            return response.status(500).send(err)
        }else {
            return response.status(200).json({success:"INSERTED TO THE ORDERS"})
        }
    })
})
router.get('/myorders/:id',(request,response) => {
    const {id} = request.params
    // const GetOrders = `
    // SELECT * FROM orders
    // JOIN product.thumbnail OM product.id =orders.product
    // WHERE user = ${id}`
    const GetOrders= `SELECT orders.*, product.thumbnail 
    FROM orders
    JOIN product ON product.id = orders.product
    WHERE user = ${id}`
    connectDb.query(GetOrders,(err,orders) => {
        if(err) {
            return response.status(500).send("INTERNAL SERVER ERROR")
        }else {
            return response.status(200).json({orders})
        }
    })
})

module.exports = router