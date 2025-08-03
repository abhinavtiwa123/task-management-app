const express = require('express');
const router = express.Router();
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// sign-in
router.post("/sign-in", async (req, res) => {
    try {
        const { username } = req.body;
        const { email } = req.body;
        const existingUser = await User.findOne({ username: username })
        const existingEmail = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "username already exist" })
        } else if (username.length < 4) {
            return res.status(400).json({ message: "username should have atleast four character" })
        }
        if (existingEmail) {
            return res.status(400).json({ message: "email already exist" })
        }
        const hashPass = await bcrypt.hash(req.body.password, 10);

        // new user create
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass
        });
        await newUser.save();
        return res.status(200).json({ message: "signIn succesfully" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "internal server error" })

    }
});

// Login route
router.post("/log-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ username: username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credential" });
        }

        // Compare password
        bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims = [{ name: username }, { jti: jwt.sign({}, process.env.JWT_SECRET) }];

                const token = jwt.sign({ authClaims }, process.env.JWT_SECRET, { expiresIn: "2d" });
                res.status(200).json({ id: existingUser._id, token: token })
            }
            else {
                return res.status(401).json({ message: "Invalid credential" });
            }
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router; 