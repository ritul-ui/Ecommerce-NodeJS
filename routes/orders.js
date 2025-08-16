const express = require("express");
const router = express.Router();
const orderController = require("../controllers/ordersController");
const Product = require("../models/Product");


// getAllOrders for a user
//add item in cart
// update product quantity
// getCart
//move cart => status update to placed

//get allm orders for a user
router.get("/get", orderController.getAllOrders);   //orders/get

//get order by specif id
router.get("/get/:orderId", orderController.getOrderById); //orders/get/:orderId    

//get the cart for a user
router.get("/cart", orderController.getCart); //orders/cart

router.post("/placeorder", orderController.placeOrder); //orders/cart

router.post("/updateCart", orderController.updateCart); //orders/updateCart

router.post("/moveToWishlist", orderController.moveToWishlist); //orders/moveToWishlist/


module.exports = router;

// p => 5
// deleteApi -> DELTE A Product
// updateCart -> {qty, -5}
