"use strict";

require('dotenv').config();

const PORT = process.env.BACKEND_PORT || 5000;
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./database');

// Initial Setup
connectDB();
app.use(express.json());
app.use(cors());

// Development
if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

// Routes
app.use('/', require('./routes/index'));
app.use('/api/posts', require('./routes/api/posts'));


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
