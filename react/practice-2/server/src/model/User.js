const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "firstname is required"],
    trim: true,
    minlength: [1, "firstname cannot be empty"],
  },

  lastname: {
    type: String,
    required: [true, "lastname is required"],
    trim: true,
    minlength: [1, "lastname cannot be empty"],
  },

  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "invalid email format"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
    trim: true,
    minlength: [6, "password must be at least 6 characters"],
  },

  phone: {
    type: String,
    required: [true, "phone number is required"],
    unique: true,
    trim: true,
    match: [/^[0-9]{10}$/, "phone must be 10 digits"],
  },

  gender: {
    type: String,
    required: [true, "gender is required"],
    trim: true,
    enum: {
      values: ["male", "female", "other"],
      message: "gender must be male, female, or other",
    },
  },

  hobbies: {
    type: [String],
    required: [true, "hobbies are required"],
    enum: {
      values: ["cricket", "dancing", "singing"],
      message: "hobbies must be cricket, dancing or singing",
    },
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: "hobbies cannot be empty",
    },
  },

  course: {
    type: String,
    required: [true, "course is required"],
    trim: true,
    minlength: [1, "course cannot be empty"],
  },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
