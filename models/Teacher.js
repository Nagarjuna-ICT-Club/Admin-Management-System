const mongoose = require("mongoose");

const stringTyped = (require, message) => {
  return {
    type: String,
    required: [require, message]
  };
};

const teacherSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: [true, "_id must be initiated!"]
  },
  email: stringTyped(
    true,
    "Email is required => Teacher Model Validation Error!"
  ),
  password: stringTyped(
    true,
    "Password is required => Teacher Model Validation Error!"
  ),
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  },
  expires_at: stringTyped(false)
});

module.exports = teacherModel = mongoose.model("teacher", teacherSchema);
