const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Databse
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/users', require('./routes/api/users'));
app.use('/auth', require('./routes/api/auth'));
app.use('/profile', require('./routes/api/profile'));
app.use('/events', require('./routes/api/event'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
