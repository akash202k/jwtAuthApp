import express from "express";
import apiRouter from "./routes/api.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // This is important for cookies
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions))

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

app.use("/api", apiRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})

