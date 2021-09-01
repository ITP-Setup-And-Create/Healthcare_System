//To get a simple express server running
const express = require('express');
//const connectDB = require('./config/db');

const app = express();

//Connect database
//connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('My API running'));    //this is a route

// Define Routes
//app.use('/api/medicines', require('./routes/api/medicines'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));