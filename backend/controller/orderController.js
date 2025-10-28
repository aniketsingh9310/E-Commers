import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config()

const currency = 'inr'
const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET 
})


// user

export const placeOrder = async (req,res) =>{
    try{
        const {items, amount, address} = req.body;
        const userId = req.userId;
        const orderData = {
            userId, 
            items,
            amount,
            address,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        await User.findByIdAndUpdate(userId,{cartData:{}})

        return res.status(201).json({message:'Order Place'})

    }catch(e){
        console.log(e) 
        res.status(500).json({message:'order Place error'})
    }
}


export const placeOrderRazorpay = async (req,res) =>{
    try{
        const {items, amount, address} = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'Razorpay',
            payment:false,
            date:Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        const option = {
            amount:amount * 100,
            currency:currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }
        await razorpayInstance.orders.create(option,(error,order)=>{
            if(error){
                console.log(error)
                return res.status(500).json(error)
            }
            res.status(200).json(order)
        })
    }catch(e){
        console.log(e)
        res.status(500).json({message:error.message})
    }
}

export const verifyRazorpay = async (req,res) =>{
    try{
        const userId = req.userId
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await User.findByIdAndUpdate(userId, {cartData:{}})
            res.status(200).json({message:'Payment Successful'})
        }
    }catch(e){

    }
}

export const userOrders = async (req,res) => {
    try{
        const userId = req.userId;
        const orders = await Order.find({userId})
        return res.status(200).json(orders)
    }catch(e){
        console.log(e)
        return res.status(500).json({message:"userOrder error"})
    }
}

// admin

export const allOrder = async (req,res) =>{
    try{
        const orders = await Order.find({})
        res.status(200).json(orders)
    }catch(e){
        console.log(e)
        return res.status(500).json({message:"adminAllorders"})
    }
}


export const updateStatus = async (req,res) =>{
    try{
        const {orderId, status} = req.body

        await Order.findByIdAndUpdate(orderId, {status})
        return res.status(201).json({message:'status updated'})
    }catch(e){
        return res.status(500).json({message:e.message})
    }

}