// import express
const express=require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

// import routes
const userRoutes = require('./routes/userRoutes')
const itemRoutes = require('./routes/itemRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')

dotenv.config();

// create a app
const app=express()

// cors
app.use(cors())

// bodyparser
app.use(express.json())

// routes

app.use('/users', userRoutes)
app.use('/items', itemRoutes)
app.use('/carts', cartRoutes)
app.use('/orders', orderRoutes)


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log('Error ',err))


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server connected on ${PORT}`)
})