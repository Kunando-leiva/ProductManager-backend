import express from 'express';
import mockProducts from '../controllers/Pruebas/mocking.js'; 

const mockingRouter = express.Router();


mockingRouter.get('/', (req, res) => {
  res.json(mockProducts);
});

export default mockingRouter;