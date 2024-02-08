const express = require('express')
const router = express.Router()
const connectDb = require('../database')

router.get('/mycart',(request,response) => {
    const getmyCart = ``
    response.send("OK")
})

router.post('/addtocart', (request,response) => {
    const {user,seller,product,variant,variant_choice,quantity} = request.body
    console.log(request.body)
    console.log(user)
    console.log(seller)
    console.log(product)
    console.log(variant_choice)
    const InsertToCart = `INSERT INTO cart (user,seller,product,choosen_variant,variant_choice,item_quantity) values  (?,?,?,?,?,?)` 
    const CheckCart  = `SELECT * FROM cart WHERE user = ${user} AND product = ${product}`
    connectDb.query(CheckCart,(err,result) => {
        if(err) {
            return response.status(500).send("INTERNAL SERVER ERROR")
        }else {
            if (result.length > 0) {
                return response.status(200).json({success: "ALREADY INSERTED"})
            }else {
                connectDb.query(InsertToCart,[parseInt(user),parseInt(seller),parseInt(product),variant,variant_choice,quantity] , (err,cart) => {
                    if(err)  {
                        console.log(err)
                        return response.status(500).send("Internal Server Error")
                    }else {
                        return response.status(200).json({success: "INSERTED TO THE CART"})
                    }
                })
            }
        }
    })
    
})



function cart(cartItems) {
    let groupedBySeller = {};
    console.log(cartItems)
    cartItems.forEach(item => {
        const { cart_id, seller, product, variant ,variant_choice,title,thumbnail,price,item_quantity,choosen_variant,selected} = item;
        const currentItem = {
            cart_id,
            product,
            title,
            thumbnail,
            selected,
            price,
            item_quantity,
            choosen_variant: JSON.parse(choosen_variant),
            variant_choice: JSON.parse(variant_choice)
        };

        if (groupedBySeller[seller]) {
            groupedBySeller[seller].cart_item.push(currentItem);
        } else {
            groupedBySeller[seller] = {
                cart_item: [currentItem],
                seller: seller,
                shopname: item.shopname,
                image: item.image,
            };
        }
    });

    const result = Object.values(groupedBySeller);
    return result;
}

router.get('/mycart/:id',(request,response) => {
    const {id} = request.params
    // const GetCartList = `SELECT  * FROM cart where user = ${id} RIGHT JOIN seller ON seller.id = ${id}`
    const GetCartList = `
    SELECT * FROM cart
    JOIN seller ON seller.id = cart.seller
    JOIN product ON product.id = cart.product
    WHERE cart.user = ${id}`
    connectDb.query(GetCartList,(err,cartList) => {
        if(err) {
            console.log(err)
            return response.status(500).send("INTERNAL SERVER ERROR")
        }else {
            if(cartList.length > 0 ) {
                return response.status(200).json({data: cart(cartList)})
                // return response.status(200).json({data: cartList})
            }else{
                return response.status(200).json({data: []})
            }
        }
    })
})

router.post('/deletecart/:id/:userId',(request,response) => {
    const {id,userId} = request.params
    console.log(id)
    console.log()
    const DeleteCart = `DELETE FROM cart WHERE cart_id = ${id} AND user =  ${userId}`
    connectDb.query(DeleteCart,(err,result) => {
        if(err) {
            return response.status(500).send("INTERNAL SERVER ERROR")
        } else {
            console.log(result)
            return response.status(200).json({success:"SUCCESSFULLY DELETED"})
        }
    })
})


module.exports = router