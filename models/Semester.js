const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
  semester: {
    type: String,
    required: [true, "Semester is required!"]
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
  }
});

module.exports = semesterModel = mongoose.model("semester", semesterSchema);
