import jwt from "jsonwebtoken";
import { set } from "mongoose";


const auth = (req, res, next) => {
    try {
        // setTimeout(() => {

        // }, 5000);
        console.log("Auth Middleware");
        // check if token is present in cookies
        const token = req.cookies?.token;
        if (req.cookies = ! null && !token) {
            console.log("No token found");
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        // verify token
        const jwtToken = token.split(" ")[1];
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        console.log("Decoded : ", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Error : ", error);
        return res.status(403).json({
            message: "Unauthorized",
        });
    }
}

export default auth;