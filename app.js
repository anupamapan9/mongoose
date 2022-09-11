const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');

// middleware 
app.use(express.json())
app.use(cors())


//schema design --------------------------------
const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please provide a name for this products'],
        trim: true,
        unique: [true, 'Name must be unique'],
        minLength: [3, 'Name must be 3 '],
        maxLength: [100, 'Name 100 ']
    },
    description: {
        type: String,
        require: [true, 'Please enter a description']
    },
    price: {
        type: Number,
        require: true,
        min: [0, 'Price must be positive']
    },
    unit: {
        type: String,
        require: true,
        enum: {
            values: ['kg', 'liter', 'pcs'],
            message: 'Unite value must be kg/liter/pcs'
        }
    },
    quantity: {
        type: Number,
        require: true,
        min: [0, 'quantity must be positive'],
        validate: (value) => {
            const isInt = Number.isInteger(value)
            if (isInt) {
                return true
            } else {
                false
            }
        },
        message: 'Quantity must be Integer'
    },
    status: {
        type: String,
        enum: {
            values: ['in-stock', 'out-of-stock', 'discontinued'],
            message: 'False value'
        }
    },
    // catagories: [{
    //     name: {
    //         type: String,
    //         require: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    // }],
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // }
}, {
    timestamps: true
})
//SCHEMA -> MODEL -> Query


//model-------------------------

const Product = mongoose.model('Product', productSchema)

// routes----------------- 
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/ap1/v1/product', async (req, res, next) => {

    try {
        // save ------------
        const product = new Product(req.body)
        const data = await product.save()
        res.status(200).json({
            message: 'Successfully added',
            status: 'success',
            data
        })
    } catch (error) {
        res.status(400).json({
            message: 'fail',
            error
        })
    }


})



module.exports = app