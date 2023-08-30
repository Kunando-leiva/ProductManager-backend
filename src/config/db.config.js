import mongoose from 'mongoose';
import config from './config.js';

export default function configureDatabase() {
  const MONGODB_URL = config.MONGODB_URL;

  mongoose.connect(MONGODB_URL)

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
}