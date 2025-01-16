import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";

dotenv.config(); // dot env config
const port = process.env.PORT; // setup port

connectDB();
const app = express();

app.use(express.json());
app.use(cors()); // middleware

app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
