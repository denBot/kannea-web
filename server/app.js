"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./database');

if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

connectDB();

app.use(express.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
