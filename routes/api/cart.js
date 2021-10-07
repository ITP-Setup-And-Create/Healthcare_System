const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Medicine = require('../../models/Medicine');
const Cart = require('../../models/Cart');
const auth = require('../../middleware/auth');

// @route   POST api/cart/:name
// @desc    Add medicine to cart by name
// @access  private
router.post('/:name', auth, async (req, res) => {
    let quantity = req.body.quantity;
    let quantityIn;
    try {
        const medicine = await Medicine.findOne({ name: { $regex: new RegExp("^" + req.params.name + "$", "i") }});

        if(!medicine) {
            return res.status(404).json({ msg: 'Medicine not found' });
        }

        if (quantity) quantityIn = quantity;

        const cart = new Cart({
            user: req.user.id,
            medicine: req.params.name,
            quantity: quantityIn
        });

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'String') {
            return res.status(404).json({ msg: 'Medicine not found' });
        }
        res.status(500).send('Server error');
    }
});

module.exports = router;