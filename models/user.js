
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
        unique:true,
        trim:true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8, // Correct typo
        maxLength: 128, // Correct typo
      },
      
    email:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Basic email validation
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }

});


const User = mongoose.model("User", userSchema);
module.exports = User;