const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, "Full name is required!"],
    min: 3
  },
  email: {
    type: String,
    required: [true, "email is required!"]
  },
  password: {
    type: String,
    max: 150
  },
  program: {
    type: String,
    required: [true, "Semester Program is required!"]
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: String
  },
  expires_at: {
    type: String
  }
});

module.exports = studentModel = mongoose.model("student", studentSchema);
