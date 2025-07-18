const {MongoClient} = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

async function connectDB() {
    if (!uri) {
        console.error('MONGODB_URI is not defined in .env file');
        return;
    }
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await client.close();
    }
}
    
module.exports = connectDB;
