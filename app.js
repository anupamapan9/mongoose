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
            value: ['kg', 'liter', 'pcs'],
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
            value: ['in-stock', 'out-of-stock', 'discontinued'],
            message: 'False value'
        }
    },
    catagories: [{
        name: {
            type: String,
            require: true
        },
        _id: mongoose.Schema.Types.ObjectId,
    }],
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier"
    }
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now,
    // },


}, {
    timestamps: true
})


// routes----------------- 
app.get('/', (req, res) => {
    res.send('Hello World!')
})



module.exports = app