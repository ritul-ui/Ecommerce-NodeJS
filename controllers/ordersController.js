// 1.user should be able to add items in the cart
// -> if alreday present updaate the count
// -> if not then include it with count 1
// -> update the price
// 2. user should be able to increment/decrement the count
// 3. user can delete an item from the cart
// 4. they can move it to wishlist
// 5. user can get all the orders for a particular user.
// 6. we should be able to update the status of an order

// cart -> final snapshot -> order

// order -> {
//     1,
//     {a, b,c},
//     amt -> num + numc
//     status -> incart
// }

// status -> {
//     incart,
//     placed,
//     shipped,
//     deleiverd,
//     cancelled
// }

// order -> {
//     user_id,
//     products[
//         {
//             product_id,
//             quantity, -> verify at checkout
//         }
//     ],
//     totalamount,
//     status // cart status
// }

const mongoose = require("mongoose");
const fs = require("fs/promises");
const { ObjectId } = require("mongodb");

const Order = require("../models/Order");
const Product = require("../models/Product");
const { findOneAndUpdate } = require("../models/User");

exports.getAllOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ user_id: userId }).populate(
      "products.product_id"
    );
    orders = orders.filter((order) => order.status !== "incart"); // Exclude cart orders
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Error fetching orders");
  }
};

exports.addItemToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity, price } = req.body;

  try {
    //add to cart
    //1. if product alreadythere update the quantity//2. add a product

    // product is present
    let order = await Order.findOneAndUpdate(
      {
        user_id: req.user.id,
        status: "incart",
        "products.product_id": productId,
      },
      {
        $inc: {
          "products.$.quantity": quantity,
          amount: price * quantity,
        },
      },
      { new: true }
    );

    if (!order) {
      order = await Order.findOneAndUpdate(
        {
          user_id: req.user.id,
          status: "incart",
          "products.product_id": productId,
        },
        {
          $push: {
            products: {
              productId,
              quantity,
            },
          },
          $inc: {
            amount: price * quantity,
          },
        },
        { new: true, upsert: true }

        // upsert will create new entry if it doesnnot exist
      );
    }

    return res.json(order);

    // const product = order.products.filter(prod => prod.product_id === productId);
    // if(product){
    //     product.quantity += 1;
    // }else{
    //     //create a new one
    // }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).send("Error adding item to cart");
  }
};

// findOneAndUpdate

// find => true => update
