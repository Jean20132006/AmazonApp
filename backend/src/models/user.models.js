import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 1,
            maxLength: 30
        },

        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email");
                }
            }
            
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 50,
        }

    },

    {
        timestamps: true,
    }
);

// Before saving any password, we need to hash it

userSchema.pre("save", async function() {

    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10); // 10 is salt rounds
});

//Compare password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

// Generate JWT token
userSchema.methods.generateAccessToken = function () {

    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};



export const User = mongoose.model("User", userSchema);