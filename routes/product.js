// Manage APIs for prodcuts

const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

//get all the products

router.get("/getAllProducts", productController.getAllProducts);

//Add an API for adding a product

router.get("/addProduct", productController.addProduct);

router.get("/addMultipleProducts", productController.addMultipleProducts);

module.exports = router;
