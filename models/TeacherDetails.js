const mongoose = require("mongoose");

const stringTyped = (require, message) => {
  return {
    type: String,
    required: [require, message],
  };
};

const teacherDetailSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: [true, "_id must be initiated!"],
  },
  full_name: stringTyped(false),
  contact_number: Array,
  subject_name: Array,
  program_name: Array,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
  expires_at: stringTyped(false),
});

module.exports = teacherDetailsModel = mongoose.model(
  "teacher_detail",
  teacherDetailSchema
);
