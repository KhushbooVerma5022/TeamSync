import express, { Request, Response } from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import healthRoute from './routes/health.routes';
import { errorHandler } from "./middleware/error.middleware";
import authRoute from "./routes/auth.routes";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/health', healthRoute);
app.use("/api/v1/auth", authRoute);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        "success": false,
        "message": "Route Not Found"
    })
})

app.use(errorHandler);

export default app;        