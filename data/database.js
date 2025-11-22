const dotenv = require('dotenv');
dotenv.config();

//import mongo client
const MongoClient = require('mongodb').MongoClient;

let database

const initDb = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client.db(); //defaults to the database in my URL
            console.log('Connected to MongoDB, using DB:', database.databaseName);

            callback(null, database);
        })
        .catch((err) => {
            console.error('Error initializing database:', err);
            callback(err);
        });
};

const getDb = () => {
    if (!database) {
        throw Error('Database is not initialized')
    }
    return database
}

module.exports = {
    initDb,
    getDb
}