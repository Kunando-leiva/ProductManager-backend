import dotenv from 'dotenv';

const environment = "DEVELOPMENT"
dotenv.config({
    path: environment === 'DEVELOPMENT' ? './.env.development' : './.env.production',
});

console.log(`Environment: ${environment}`);
console.log(`PORT: ${process.env.PORT}`);

export default {
    
    MONGODB_URL: process.env.MONGO_URL,
    PORT: process.env.PORT || 3000,  
    KEY: process.env.KEY,
    CLIENTE_ID_GHB: process.env.CLIENTE_ID_GHB,
    CLIENTE_SECRET_GHB: process.env.CLIENTE_SECRET_GHB,
    URL_CALLBACK_GHB: process.env.URL_CALLBACK_GHB,
};