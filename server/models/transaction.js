const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const transactionSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
    ,
    userEmail:{
        type: String,
        requird: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    orderId:{
        type: String,
        required: true
    },
    orderData:{
        type: Array,
        required: true,
        default:[]
    },
    date:{
        type:Date,
        default: Date.now
    }
})

const Transaction = mongoose.model('Transaction',transactionSchema)

module.exports = {
    Transaction
}