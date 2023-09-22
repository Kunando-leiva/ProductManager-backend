import { config } from "dotenv";



config({
  path: `../../.env.${process.env.NODE_ENV}`,
});

export const dbUser = process.env.DB_USER;
export const dbPassword = process.env.DB_PASSWORD;
export const dbHost = process.env.HOST;
export const dbName = process.env.DB_NAME;
export const key = process.env.KEY
export const mongourl = process.env.MONGO_URL











// export default function configureDatabase() {
//   const MONGODB_URL = config.MONGODB_URL;

//   mongoose.connect(MONGODB_URL)

//   const db = mongoose.connection;

//   db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//   db.once('open', () => {
//     console.log('Connected to MongoDB');
//   });
// }