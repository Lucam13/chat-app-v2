import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,

        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    area: {
        type: String,
        required: true
    },  
} , { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;