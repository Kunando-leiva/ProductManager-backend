import express from 'express';
import {  addLogger, addErrorLogger  } from "../utils/logger.js"

const router = express.Router();

router.use(addLogger); 
router.use(addErrorLogger);

router.get('/loggerTest', (req, res) => {
    req.logger.debug('Este es un mensaje de nivel debug');
    req.logger.http('Este es un mensaje de nivel http');
    req.logger.info('Este es un mensaje de nivel info');
    req.logger.warning('Este es un mensaje de nivel warning');
    req.logger.error('Este es un mensaje de nivel error');
    
    res.json({ message: 'Logs enviados' });
});

  export default router