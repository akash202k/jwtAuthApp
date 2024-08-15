import express from "express";
import apiRouter from "./routes/api.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

app.use("/api", apiRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})

