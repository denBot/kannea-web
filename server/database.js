const mongoose = require('mongoose');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbAddr = process.env.DB_ADDR;

const connectDB = async () => {
    const uri = `mongodb+srv://${dbUser}:${dbPass}@${dbAddr}/${dbName}?retryWrites=true&w=majority`;

    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`MongoDB Connected: ${dbUser}@${dbAddr}/${dbName}`);
    } catch (err) {
        console.err('Failed to connect to MongoDB Server', err);
        process.exit(1);
    }
}

module.exports = connectDB;