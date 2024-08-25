import JWT from 'jsonwebtoken';
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";

// User Register
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validations
        if (!name) {
            return res.status(400).send({ msg: "Please add your name!" });
        }
        if (!email) {
            return res.status(400).send({ msg: "Please add your email!" });
        }
        if (!password || password.length < 6) {
            return res.status(400).send({ msg: "Please add a password with at least 6 characters!" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ msg: "Account with this email already exists!" });
        }

        // Hash password and save new user
        const hashedPassword = await hashPassword(password);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).send({ msg: "Registration successful!" });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ msg: err.message });
    }
};

// User Login
/*
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validations
        if (!email || !password) {
            return res.status(400).send({ msg: 'Please provide email and password!' });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ msg: 'User not found!' });
        }

        // Compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({ msg: 'Invalid username or password!' });
        }

        // Create and send token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).send({ msg: 'Login successful!', token, user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: 'Error in login API', error });
    }
}
*/
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validations
        if (!email || !password) {
            return res.status(400).send({ msg: 'Please provide email and password!' });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ msg: 'User not found!' });
        }

        // Compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({ msg: 'Invalid email or password!' });
        }
        console.log("JWT_SECRET:", process.env.jet); 
        console.log("User ID:", user._id);
        // Ensure JWT_SECRET is defined
        if (!process.env.jet) {
            throw new Error("jet is not defined");
        }

        // Log User ID for debugging
        console.log("User ID:", user._id);

        // Create and send token
        const token = JWT.sign({ _id: user._id }, process.env.jet, { expiresIn: '7d' });
        res.status(200).send({ msg: 'Login successful!', token, user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: 'Error in login API', error });
    }
}

export { registerController, loginController };
