import { Router } from "express";
import mongoose from "mongoose";
import User from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../middleware/index.js";


const router = Router();

router.get("/health", (req, res) => {
    res.send("OK");
})

router.post("/signin", async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => { console.log("Connected to MongoDB") });
        const { username, password } = req.body;

        // check user exist in db
        const user = await User.findOne({ username });
        if (!user) {
            res.json({
                error: "user does not exist. try signup instead !"
            })
            return;
        }

        // compare password
        await bcrypt.compare(password, user.password, async (err, result) => {
            if (err) {
                console.log("Invalid Password !");
                return res.json({
                    error: "Invalid Password !"
                })
            }
            const jwtToken = await jwt.sign({ username, id: user._id }, process.env.JWT_SECRET);
            const token = `Bearer ${jwtToken}`;
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 60 * 60 * 1000
            });
            console.log("Login Success");
            return res.json({
                message: "Login Success"
            })
        })
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

router.post("/signup", async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => { console.log("Connected to MongoDB") });

        // check is user with given username is already exist already exist 

        const { username, password } = req.body;
        const HashedPassword = await bcrypt.hash(password, 1);
        console.log(HashedPassword);
        // hash password and then stoare in db
        const isUserExist = await User.findOne({ username });
        if (isUserExist) {
            console.log(`user ${isUserExist.username} already exist`);
            return res.status(400).json({
                message: "User already exist",
            });
        }
        const user = new User({ username, password: HashedPassword });
        await user.save();

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

router.get("/signout", (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "Signout success",
    });
})

router.get("/profile", auth, async (req, res) => {
    try {
        const user = req.user;
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
})

export default router;