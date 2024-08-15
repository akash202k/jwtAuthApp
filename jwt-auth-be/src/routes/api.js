import { Router } from "express";
import mongoose from "mongoose";
import User from "../db/db.js";
import bcrypt from "bcrypt";


const router = Router();

router.get("/health", (req, res) => {
    res.send("OK");
})

router.post("/signup", async (req, res) => {
    try {
        mongoose.connect(process.env.MONGO_URI)
            .then(() => { console.log("Connected to MongoDB") });

        // check is user with given username is already exist already exist 

        const { username, password } = req.body;
        const HashedPassword = await bcrypt.hash(password, 1);
        console.log(HashedPassword);
        // hash password and then stoare in db
        const user = new User({ username, password: HashedPassword });
        await user.save();
        console.log(user);
        console.log(user._id);

        res.json({
            message: "User signed up successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
})

export default router;