import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { allOrder, placeOrder, updateStatus, userOrders } from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRoutes = express.Router()

// for User
orderRoutes.post('/placeorder',isAuth,placeOrder)
orderRoutes.post("/userorder",isAuth,userOrders)

// fro Admin
orderRoutes.post("/list",adminAuth,allOrder)
orderRoutes.post("/status",adminAuth,updateStatus)

export default orderRoutes