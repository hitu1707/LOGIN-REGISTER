import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add your name!"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please add your email!"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please add your password!"],
            minlength: 6,
            maxlength: 60,
        },
        role: {
            type: String,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
