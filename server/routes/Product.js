const express = require('express')
const router = express.Router()
const connectDb = require('../database')


router.get('/',(request,response) => {
    const getProducts = ` SELECT * FROM product`
    connectDb.query(getProducts,(err,result) => {
        if(err) {
            return response.status(500).send({error: "Internal Server Error"})
        } else {
            if(result.length > 0) {
                console.log(result.length)
                return response.status(200).json({
                    data: result
                })
            } else {
                return response.status(404).json({error: "No product found"})                
            }
        }
    })
  
})


function get_rating(rating,target) {
    if(typeof rating === "string") return rating;
    let answer = []
    for(let i = 1 ; i < target + 1 ; i ++) {
        let rating_num = rating.filter(num => num === i)
        answer.push(rating_num.length * i)
        console.log(rating_num.length,i)
    }    
    let rating_total = rating.length
    let score_total = answer.reduce((acc,cur) => acc + cur , 0)
    let rating_average = score_total / rating_total
    return rating_average.toFixed(1)
}
function get_rating_length(ratings) {
    if(typeof ratings === "string") return ratings;
    return ratings.length
}
function get_rating_preview(ratings,average) {

    let rating_preview = {
        5 : 0,
        4 : 0,
        3 : 0,
        2 : 0,
        1 : 0,
    }
    if(typeof ratings === "string") return rating_preview;
    for(let i = average ;  i > 0 ; i --) {
        let rating = ratings.filter(num => num === i)
        rating_preview[i] = rating.length
    }
    return rating_preview
}



function getLikesFollowers(seller,table) {
    const likesAndFollowers = `SELECT * FROM seller_likes WHERE seller = 5`
    connectDb.query(likesAndFollowers,(err,result) => {
        if(err) {
            return "INTERNAL SERVER ERROR"
        }else{
            if(result.length > 0) {
                return result.length
            }
            else {
                return 0
            }
        }
    })
}

router.get('/getproduct/:id',(request,response) => {
    const {id} = request.params
    const product = `SELECT * FROM product WHERE id = ?`
    connectDb.query(product, [id] ,(err,product) => {
        if(err) {
            return response.status(500).json({error: "Internal server error"})
        }else {
            if(product.length > 0 ) {
                const getproductImages = `SELECT * FROM product_images WHERE product = ${id}`
                connectDb.query(getproductImages,(err,images) => {
                    if(err) {
                        return response.status(500).send("INTERNAL SERVER ERROR")
                    }else {
                        if(images.length === 0 ) return response.status(404).json("No product images")
                        if(images.length > 0 ) {
                            const getProductRating = `SELECT * FROM product_rating WHERE product = ${id}`
                            connectDb.query(getProductRating,(err,rating) => {
                                if(err) {
                                    return response.status(500).send("INTERNAL SERVER ERROR")
                                }else {
                                        const getSeller = `SELECT shopname ,image ,id FROM seller where id = ${product[0].seller}`
                                        connectDb.query(getSeller,(err,seller) => {
                                            if(err) {
                                                return response.status(500).send("INTERNAL SERVER ERROR")
                                            } else {
                                                if(seller.length > 0) {
                                                    const getSellerRating = `SELECT rating FROM seller_rating WHERE seller = ${seller[0].id}`
                                                    connectDb.query(getSellerRating,(err,sellerRating) => {
                                                        if(err) {
                                                            return response.status(500).send({error: "Internal Server Error"})
                                                        }else {
                                                            const seller_rating = sellerRating.length > 0 ?sellerRating.map(rating => rating.rating): "No ratings yet"
                                                            
                                                            console.log(seller_rating,'asd')
                                                            
                                                            const ratings_data = rating.length > 0 ? rating.map(rating => rating.rating) : "No ratings yet"
                                                            console.log(seller[0].shopname)
                                                            
                                                            const images_data = images.map(image => image.image)
                                                            const getAllSellerProducts = `SELECT * FROM product WHERE seller = ${seller[0].id}`
                                                            connectDb.query(getAllSellerProducts,(err,seller_products) => {
                                                                if(err) {
                                                                    return response.status(500).send("INTERNAL SERVER ERROR")
                                                                }
                                                                else {
                    console.log(seller_products.length,'seller')
                    const getLikes = `SELECT * FROM seller_likes WHERE seller = ${seller[0].id}`
                    connectDb.query(getLikes,(err,likes) => {
                        if(err) {
                            return response.status(500).send("INTERNAL SERVER ERROR")
                        }else {
                            const getFollowers = `SELECT * FROM seller_followers WHERE seller = ${seller[0].id}`

                            connectDb.query(getFollowers,(err,followers) => {
                                if(err) {
                                    return response.status(500).send("INTERNAL SERVER ERROR")
                                }else {
                                    return response.status(200).json({
                                        data: {
                                            ...product[0],
                                            product_rating:get_rating(ratings_data,5),
                                            images:images_data,
                                            seller: {
                                                id: seller[0].id,
                                                shopname:seller[0].shopname,
                                                image: seller[0].image,
                                                rating: get_rating(seller_rating,5),
                                                rating_count: get_rating_length(seller_rating),
                                                products: seller_products.length,
                                                likes: likes.length,
                                                followers: followers.length
                                            },
                                            rating_preview: get_rating_preview(ratings_data,5),
                                            ratings_count: ratings_data.length,
                                        }})
                                }
                            })
                        }
                    })
                                                                    }
                                                                })
                                                            // return response.status(200).json({seller : seller_rating})
                                                        }
                                                    })
                                                }
                                                return ""
                                            }
                                        })
                                }
                            })
                        }
                    }
                })
            } else {
                return response.status(404).json({error: "No result found"})
            }
        }
    })
})

// const images = ['image3','image2','image4','image4']
// const newImages = []
// images.map(val => newImages.push(`${`(? ,${val})`}`))
// console.log(newImages.join(','))
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const destinationFolder = './public/images'

if(!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder,{recursive:true})
}
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,destinationFolder)
    },
    filename:(req,file,cb) => {
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
router.post('/add_product/:id',upload.array("images") ,(request,response) => {
    const {id} = request.params
   
    const {title,price,quantity,variant,description} = request.body
    const thumbnail = request.files[0].filename
    console.log(title)
    console.log(price)
    console.log(quantity)
    console.log(variant)
    console.log(description)
    console.log(thumbnail)
    console.log(id)
    const INSERT_PRODUCT = `INSERT INTO product (title,price,quantity,seller,variant,description,thumbnail) values  (?,?,?,?,?,?,?)`
    connectDb.query(INSERT_PRODUCT,[title,price,quantity,id,variant,description,thumbnail],(err,product) => {
        if(err) {
            console.log(err)
            return response.status(500).send("INTERNAL SERVER ERROR 1")
        }else {
            const images = request.files.slice(1).map(filename => filename.filename)
            const newImages = images.map((image) => [product.insertId, image]);
            const INSERT_IMAGES = `INSERT INTO product_images  (product,image) VALUES ?`
            connectDb.query(INSERT_IMAGES,[newImages] , (err,images) => {
                if(err) {
                    console.log(err)
                    return response.status(500).send("INTERNAL SERVER ERROR 2")
                }else {
                    return response.status(200).json({success: `product success created ${product.insertId}`})
                }
            })
        }
    })
})

module.exports = router


