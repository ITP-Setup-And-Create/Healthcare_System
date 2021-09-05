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

// @route   GET api/auth
// @desc    Authenticate admin & get token
// @access  public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // See if admin exists
        let admin = await Admin.findOne({ email });

        if(!admin) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials-email'}] });
        }

        //To verify password
        if(password != admin.password){
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials-pass'}] });
        }

        // Return jsonwebtoken
         const payload = {
            admin: {
                id: admin.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, 
        (err, token) => {
            if(err) throw err;
            res.json({ token });
        }); 

        //res.send('User registered')

    } catch(err) {
        console.error(error.message);
        res.status(500).send('Server error');   
        //since this is the last res.status or res.json, return isn't needed
    }
});

module.exports = router;