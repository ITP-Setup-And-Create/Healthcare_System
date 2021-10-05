const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const Admin = require('../../models/Admin');

// @route   POST api/admin
// @desc    Register admin
// @access  public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('nic', 'NIC is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, nic, email, password } = req.body;

    try {
        // See if admin exists
        let admin = await Admin.findOne({ nic });

        if(admin) {
            return res.status(400).json({ errors: [{ msg: 'Admin already exists'}] });
        }

        admin = new Admin({ 
            name,
            nic,
            email,
            password
        });

        // Encrypt password
        /* const salt = await bcrypt.genSalt(10);

        admin.password = await bcrypt.hash(password, salt); */  //takes in plain text password and salt

        await admin.save();  //save admin to database

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
        console.error(err.message);
        res.status(500).send('Server error');   
        //since this is the last res.status or res.json, return isn't needed
    }
});

module.exports = router;
