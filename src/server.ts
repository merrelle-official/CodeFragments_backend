import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from './routes/userRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';
import authRoutes from "./routes/authRoutes";
import followRoutes from "./routes/followRoutes"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', followRoutes);
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
