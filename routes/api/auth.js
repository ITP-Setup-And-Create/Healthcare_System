const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator'); 

const Admin = require('../../models/Admin');

// @route   GET api/auth
// @desc    Test route
// @access  public
router.get('/', auth, async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id); //.select('-password');
        res.json(admin);
    } catch(err) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;