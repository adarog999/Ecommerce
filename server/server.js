const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// routes 

const UserApi = require('./routes/User')
const ProductApi = require('./routes/Product')
const SellerApi = require('./routes/Seller')
const Cart = require('./routes/Cart')
const Order = require('./routes/Order')
// routes 

const PORT = 5000;

const app = express()

app.use(express.json())
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))
app.use(express.static('public'));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',UserApi)
app.use('/products',ProductApi)
app.use('/seller',SellerApi)
app.use('/cart',Cart)
app.use('/order',Order)

app.listen(PORT,() => {
    console.log("App is fire in localhost 5000")
})



