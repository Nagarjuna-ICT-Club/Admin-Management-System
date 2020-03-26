const accountRouter = require("express").Router();

// models
const studentModel = require("../models/Student");

// new student
accountRouter.post("/new-student", async (req, res) => {
  const { full_name, year, program } = req.body;

  const email =
    full_name
      .split(" ")
      .join("")
      .toLowerCase() +
    year +
    "@nagarjunacollege.edu.np";
  const password =
    full_name
      .split(" ")
      .join("")
      .toLowerCase() + year;

  const newStudent = new studentModel({
    full_name,
    email,
    password,
    program
  });
  try {
    // check if email already exists
    const emailExist = await studentModel.findOne({
      email
    });

    if (emailExist)
      return res
        .status(400)
        .json({ msg: "Student with that email already exists!" });

    await newStudent.save();

    res.status(200).json({ msg: "Student account created successfully!" });
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg: "Error generating new"
      });
  }
});

// update student
accountRouter.patch("/update-student", async (req, res) => {
  const { password, email } = req.body; 

  const hashedPassword = require("bcrypt").hashSync(password, 10);

  try {
    // check if email exists or not
    const emailExist = await studentModel.findOne({ email });

    if (!emailExist)
      return res.status(400).json({ msg: "No student found with that email!" });
    const updateStatus = await studentModel.updateOne(
      {
        email
      },
      {
        password: hashedPassword
      }
    );

    // if no change is done!
    if (updateStatus.nModified === 0)
      return res.status(400).json({ msg: "No change found!" });

    // check if there is any error
    if (!updateStatus)
      return res.status(500).json({
        msg: "Error updating student => ams/routes/accounts"
      });

    res.status(200).json({ msg: "Student credentials updated successfully!" });
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg: "Error updating student credentials => ams/routes/accounts.js"
      });
  }
});

// delete student
accountRouter.delete("/delete-student", async (req, res) => {
  try {
    const { email } = req.body;

    // check if email exists or not
    const emailExist = await studentModel.findOne({ email });

    if (!emailExist)
      return res.status(400).json({ msg: "No student found with that email!" });

    const deleteStatus = await studentModel.deleteOne({
      email
    });

    if (!deleteStatus)
      return res.status(400).json({ msg: "Student was not deleted!" });

    res.status(200).json({
      msg: "Student deleted successfully!"
    });
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg: "Error deleting student => ams/routes/accounts.js"
      });
  }
});
module.exports = accountRouter;
