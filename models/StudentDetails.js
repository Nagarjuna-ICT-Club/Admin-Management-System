const mongoose = require("mongoose");

const stringTyped = (require, message) => {
  return {
    type: String,
    required: [require, message]
  };
};

const studentDetailSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: [true, "_id must be initiated!"]
  },
  full_name: stringTyped(false),
  contact_number: stringTyped(false),
  semester_id: stringTyped(true, "Semester ID must be initiated!"),
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  },
  expires_at: stringTyped(false)
});

module.exports = studentDetailsModel = mongoose.model("student_detail", studentDetailSchema);