"use strict";

require('dotenv').config();

const PORT = process.env.BACKEND_PORT || 5000;
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./utils/database');

// Initial Setup
connectDB();

// Static directories
app.use(express.static('frontend/dist'))
app.use('/media', express.static('server/media'))

// Development
if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

// Routes
app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin-panel/admin'));
app.use('/api/posts', require('./routes/api/posts'));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
