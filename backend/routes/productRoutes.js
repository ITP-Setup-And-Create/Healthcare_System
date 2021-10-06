const express = require('express');
const router = express.Router();

const {
    getAllProducts, 
    getProductById
} = require('../controller/productController');

//@desc GET all items from DB
//@route GET /api/items
//@access Public
router.get('/', getAllProducts)

//@desc GET an item by ID from DB
//@route GET /api/items
//@access Public
router.get('/:id', getProductById)

module.exports = router;