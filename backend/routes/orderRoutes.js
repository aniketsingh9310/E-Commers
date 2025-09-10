import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { allOrder, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRoutes = express.Router()

// for User
orderRoutes.post('/placeorder',isAuth,placeOrder)
orderRoutes.post('/razorpay',isAuth,placeOrderRazorpay)
orderRoutes.post("/userorder",isAuth,userOrders)
orderRoutes.post("/verifyrazorpay",isAuth,verifyRazorpay)

// fro Admin
orderRoutes.post("/list",adminAuth,allOrder)
orderRoutes.post("/status",adminAuth,updateStatus)

export default orderRoutes