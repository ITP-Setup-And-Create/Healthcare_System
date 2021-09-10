const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Medicine = require('../../models/Medicine');

// @route   POST api/medicine
// @desc    Add medicines
// @access  private
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('producer', 'Producer is required').not().isEmpty(),
    check('form', 'Form is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('ageGroup', 'Age Group is required').not().isEmpty(),
    check('cost', 'Cost is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, producer, form, ageGroup, cost } = req.body;
    let type = req.body.type;

    try {
        let medicine = await Medicine.findOne({ name: { $regex: new RegExp("^" + name + "$", "i") } });
        //{Nickname: { $regex : new RegExp(player, "i") }}
        //new RegExp("^" + player + "$", "i")

        if(medicine){
            return res.status(400).json({ errors: [{ msg: 'Medicine already exists in the system'}] });
        }

        type = type.split(',').map(type => type.trim());

        medicine = new Medicine({
            name, producer, form, type, ageGroup, cost
        });

        await medicine.save();

        res.json(medicine);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/medicine/:id
// @desc    Update medicine by ID
// @access  private
router.put('/:id', [
    check('type', 'Type is required').not().isEmpty(),
    check('ageGroup', 'Age Group is required').not().isEmpty(),
    check('cost', 'Cost is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { ageGroup, cost } = req.body;
    let type = req.body.type;

    try {
        let medicine = await Medicine.findById(req.params.id);

        if(medicine) {
            type = type.split(',').map(type => type.trim());
            const updateMedicine = { type, ageGroup, cost };

            //Update
            medicine = await Medicine.findOneAndUpdate(
                { _id: req.params.id },
                { $set: updateMedicine },
                { new: true }
            );
        }
        else return res.status(400).json({ errors: [{ msg: 'Medicine does not exist'}] });

        res.json(medicine);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Medicine does not exist' });
        }
        res.status(500).send('Server error');
    }
});

// @route   GET api/medicine
// @desc    Get all medicines
// @access  private
router.get('/', async (req,res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/medicine/:name
// @desc    Get medicine by name
// @access  private
router.get('/:name', async (req, res) => {
    try {
        const medicine = await Medicine.findOne({ name: { $regex: new RegExp("^" + req.params.name + "$", "i") } });

        if(!medicine) {
            return res.status(404).json({ msg: 'Medicine not found' });
        }

        res.json(medicine);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'String') {
            return res.status(404).json({ msg: 'Medicine not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/medicine/:name
// @desc    Delete medicine by name
// @access  private
router.delete('/:name', async (req, res) => {
    try {
        const medicine = await Medicine.findOne({ name: { $regex: new RegExp("^" + req.params.name + "$", "i") }});

        if(!medicine) {
            return res.status(404).json({ msg: 'Medicine not found' });
        }

        await medicine.remove();

        res.json({ msg: 'Medicine removed' });
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'String') {
            return res.status(404).json({ msg: 'Medicine not found' });
        }
        res.status(500).send('Server error');
    }
});

module.exports = router;