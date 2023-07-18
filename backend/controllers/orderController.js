import { asyncHandler } from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc  create new Order
//@route POST/api/order
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(404);
    throw new Error("No order items");
  } else {
    try {
      const order = new Order({
        orderItems: orderItems.map((x) => ({
          ...x,
          product: x._id,
          _id: undefined,
          quantity: x.qty,
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      let createOrder;
      createOrder = await order.save();
      res.status(201).json(createOrder);
    } catch (e) {
      console.log(e);
    }
  }
});
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id});
  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const order = await Order.findById(id).populate('user','name email');
  if(order){
    res.status(200).json(order);
  }
  else{
    throw new Error('No order with given ID was found');
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  try{if(order){
    order.isPaid = true;
    order.paidAt = Date.now();
    // order.paymentResult = {
    //   id: req.body.payer.id,
    //   status: req.body.payer.status,
    //   update_time: req.body.payer.update_time,
    //   email_address: req.body.payer.email_address,
    // }
    const updateOrder = await order.save();
    res.status(200).json(updateOrder);
  }}
  catch(e){
    throw new Error(e.message); 
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if(order){
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  }else{
    res.status(404);
    throw new Error(`Order not found`);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({}).populate('user','id name');
  res.json(order);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
};
