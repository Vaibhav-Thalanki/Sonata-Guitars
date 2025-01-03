const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const { Transaction } = require("../models/transaction");
const {User} = require('../models/user')
const paypalClient = require('../utils/paypal.client')
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk')


const addTransaction  =async (req)=>{
    try{
        //check if approved req is on paypal server
        let request = new checkoutNodeJssdk.orders.OrdersGetRequest(req.body.orderId);
        let order;
        // execute order
        order = await paypalClient.client.execute(request)
        if(!order || !request) throw new ApiError(httpStatus.NOT_FOUND,'Order Not Found')

        const transaction = new Transaction({
            userId: req.user._id
            ,
            userEmail:req.user.email,
            orderId:req.body.orderId,
            orderData:order.result,
            date:new Date(order.headers.date)
        });
        await transaction.save()
        console.log(req.user);
        
        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            { "$push":{
                history:[
                    {
                        transactionId: transaction._id,
                        date: transaction.date,
                        orderId: transaction.orderId,
                        amount: transaction.orderData[0].purchase_units[0].amount.value,
                        items: transaction.orderData[0].purchase_units[0].items
                    }
                ]
            },},
            {new:true}
        )

        if(!user) throw new ApiError(httpStatus.NOT_FOUND,'User Not Found')

        return user
    }
    catch(err){
        throw err
    }
}

module.exports = {
    addTransaction
}