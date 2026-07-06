import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { authMiddleware } from './middleware/authMiddleware.js';
/**Route imports */
import tenantRoutes from './routes/tenantRoutes.js';
import managerRoutes from './routes/managerRoutes.js';
import propertyRouter from './routes/propertyRoutes.js';
/** CONFIGURATIONS  */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
/** ROUTES */
app.use('/managers', authMiddleware(["manager"]), managerRoutes);
app.use('/tenants', authMiddleware(["tenant"]), tenantRoutes);
app.use('/', propertyRouter);
app.get('/', (req, res) => {
    res.send("This is home route");
});
/** SERVER */
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
//# sourceMappingURL=index.js.map