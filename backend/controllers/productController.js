import { request } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc  Fetch all products
//@route GET/api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? { name: new RegExp(req.query.keyword, "i") }
    : {};
  try {
    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (e) {
    console.log(e);
  }
});

// @desc  Fetch one product by Id
//@route GET/api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    res.json({ product });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//create product
// post
//admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/image/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    numReviews: 0,
    description: "Sample Description",
    countInStock: 0,
  });
  try {
    const createdProduct = await product.save();
    res.status(200).json(createdProduct);
  } catch (e) {
    console.log(e);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, countInStock, brand, category, image } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.countInStock = countInStock;
    product.category = category;
    product.image = image;
    product.brand = brand;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404).json("Product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(201).json({ success: true });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Create a review
// POST api/product/:id/review
// user private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReview = product.reviews.find(
      (review) => review.user.toString() === request.user._id.toString()
    );
    if (alreadyReview) {
      res.status(404);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getTopProducts,
  deleteProduct,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  createProductReview,
};
