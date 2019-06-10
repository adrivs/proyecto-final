const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const Event = require('../../models/Event');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const axios = require('axios');

// @route   POST api/events
// @desc    Create a event
// @access  Private
router.post(
    '/',
    [
        auth
        // [
        //     check('location', 'Location is required')
        //         .not()
        //         .isEmpty(),
        //     check('language', 'Language is required')
        //         .not()
        //         .isEmpty(),
        //     check('title', 'Title is required')
        //         .not()
        //         .isEmpty(),
        //     check('date', 'Date is required')
        //         .not()
        //         .isEmpty()
        // ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array });
        }

        try {
            const { location, language, title, date, user } = req.body;

            //const user = User.findById(req.user.id).select('-password');
            const newEvent = new Event({
                location,
                language,
                title,
                date,
                user: req.user.id
            });

            const event = await newEvent.save();

            res.json(event);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/events
// @desc    Get all events
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/events/:id
// @desc    Get one event by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/events
// @desc    Delete an event
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        // Check user
        if (event.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You are not authorized' });
        }

        await event.remove();

        res.json({ msg: 'Event removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/events/join/:id
// @desc    Join an event
// @access  Private
router.put('/join/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        // Check if user has already joined
        if (
            event.usersAttending.filter(u => u.user.toString() === req.user.id)
                .length > 0
        ) {
            return res.status(400).json({ msg: 'You have already joined' });
        }

        event.usersAttending.unshift({ user: req.user.id });

        await event.save();
        res.json(event.usersAttending);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

// @route   PUT api/events/takeoff/:id
// @desc    Take off from an event
// @access  Private
router.put('/takeoff/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        // Check if user has already joined
        if (
            event.usersAttending.filter(u => u.user.toString() === req.user.id)
                .length === 0
        ) {
            return res.status(400).json({ msg: 'You have not yet joined' });
        }

        // Get remove index
        const removeIndex = event.usersAttending.map(u =>
            u.user.toString().indexOf(req.user.id)
        );

        event.usersAttending.splice(removeIndex, 1);

        await event.save();

        res.json(event.usersAttending);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

// @route   GET api/events/latlang
// @desc    Get lat and land from location
// @access  Private
router.get('/:id/latlang', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        const location = event.location;
        const locURL = location
            .split(' ')
            .join('%20')
            .replace(',', '');
        const latLang = await axios.get(
            `https://eu1.locationiq.com/v1/search.php?key=80ea07bc0a0758&q=${locURL}=&format=json`
        );
        console.log(latLang.data);
        res.json(latLang.data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;
