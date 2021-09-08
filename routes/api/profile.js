const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator'); 

const Profile = require('../../models/Profile');
const Admin = require('../../models/Admin');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => { //async because we're using mongoose, which returns a promise
    try {
        const profile = await Profile.findOne({ admin: req.admin.id }).populate('admin', ['name']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this admin'})
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', [ auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        bio,
        status,
        skills,
        youtube,
        linkedin,
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.admin = req.admin.id;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //Build social object
    profileFields.social = {};
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (youtube) profileFields.social.youtube = youtube;

    //console.log(profileFields.skills);

    try {
        let profile = await Profile.findOne({ admin: req.admin.id });

        if(profile) {
            //Update
            profile = await Profile.findOneAndUpdate(
                { admin: req.admin.id }, 
                { $set: profileFields}, 
                { new : true}
            );

            return res.json(profile);
        }

        //Create
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}); 

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('admin', ['name']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/profile/admin/:admin_id
// @desc    Get profile by admin id
// @access  Public
router.get('/admin/:admin_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ admin: req.params.admin_id}).populate('admin', ['name']);

        if(!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/profile
// @desc    Delete profile, admin & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // remove profile
        await Profile.findOneAndRemove({ admin: req.admin.id });
        // remove admin
        await Admin.findOneAndRemove({ _id: req.admin.id });
        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [ auth, [
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
] ], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        from,
        to,
        current
    } = req.body;

    const newExp = {
        company,
        from,
        to,
        current
    }   //creates an object with the data the admin submits

    try {
        const profile = await Profile.findOne({ admin: req.admin.id });

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ admin: req.admin.id });

        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from GitHub
// @access  Public
// 23rd lecture

module.exports = router;