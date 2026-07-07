import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import multer from 'multer';
import { getProperties } from '../controllers/propertyControllers.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.get('/properties', getProperties);
// router.get('/property/:id', getProperty);
router.post('/property', 
    authMiddleware(["manager"]),
    upload.array("photos"),
    //  createProperty
);

export default router;