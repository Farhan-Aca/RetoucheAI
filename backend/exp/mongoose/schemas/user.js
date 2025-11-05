import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
    username: {
        type : mongoose.Schema.Types.String,
        required : true,
        unique : true,
            },

    email: {
        type : mongoose.Schema.Types.String,
        required : true,
        unique : true,
        validate: { 
            validator: (value) => validator.isEmail(value),
            message: "Adresse e-mail invalide",
                },
         },

    password: {
        type : mongoose.Schema.Types.String,
    },
});



export const User = mongoose.model("User", UserSchema);

