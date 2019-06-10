const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

// @route   POST api/auth
// @desc    Authenticate user and get token.
// @access  Public
router.post(
    '/',
    [
        check('email', 'Please, introduce an email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Get the user in the database
            let user = await User.findOne({ email });

            // See if user exists
            if (!user) {
                res.status(400).json({
                    errors: [{ msg: 'Invalid credentials' }]
                });
            }

            // Compare the password introduced by user and the one got from the user in the database
            const isMatch = await bcrypt.compare(password, user.password);

            // If passwords don't match...
            if (!isMatch) {
                res.status(400).json({
                    errors: [{ msg: 'Invalid credentials' }]
                });
            } else {
                console.log('Logged!');
            }

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
