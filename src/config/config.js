import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGODB_URL: process.env.MONGO_URL,
    PORT: process.env.PORT || 8080,
    KEY: process.env.KEY,

};