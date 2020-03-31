const accountRouter = require("express").Router();

// packages
const axios = require("axios");

// models
const studentModel = require("../models/Student");
const studentDetailsModel = require("../models/StudentDetails");
const adminModel = require("../models/Admin");
const adminDetailsModel = require("../models/AdminDetails");

//------------------------------------------------------------------------------------------------------------------------------------------
// admin account crud starts

//--------------------
// create new admin   |
//--------------------

accountRouter.post("/new-admin", async (req, res) => {
  const _id = require("mongoose").Types.ObjectId();
  const { email, password, full_name, contact_number } = req.body;

  const hashedPassword = require("bcrypt").hashSync(password, 10);

  const newAdmin = new adminModel({
    _id,
    email,
    password: hashedPassword
  });
  const newAdminDetail = new adminDetailsModel({
    _id,
    full_name,
    contact_number
  });

  try {
    // check if email and contact number exist or not
    const emailExist = await adminModel.findOne({ email });
    if (emailExist)
      return res
        .status(400)
        .json({ msg: "Admin with that email already exists" });

    const contactExist = await adminDetailsModel.findOne({ contact_number });
    if (contactExist)
      return res
        .status(400)
        .json({ msg: "Admin with that contact number already exists" });

    // if no previous data exists
    await newAdmin.save();
    if (!newAdminStatus)
      return res.status(400).json({ msg: "Error initializing admin data!" });

    await newAdminDetail.save();
    if (!newAdminDetailStatus)
      return res
        .status(400)
        .json({ msg: "Error initializing admin detail data!" });

    res.status(200).json({ msg: "New Admin created successfully!" });
  } catch (err) {
    res.status(500).json({
      msg: "Error creating new admin => accounts router!",
      err
    });
  }
});

//--------------------
//  Read Admin        |
//--------------------

accountRouter.get("/get-admin", async (req, res) => {
  try {
    const adminDetail0 = await adminModel.find();
    const adminDetail1 = await adminDetailsModel.find();

    if (!adminDetail0 || !adminDetail1)
      return res
        .status(400)
        .json({ msg: "Error fetching data => accounts router!" });

    res.status(200).json({
      admin: adminDetail0,
      adminDetails: adminDetail1
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error on reading admin data => accounts router!" });
  }
});

//--------------------
//  Update Admin      |
//--------------------
accountRouter.patch("/update-admin", async (req, res) => {
  try {
    const { _id, email, password, full_name, contact_number } = req.body;

    // backups
    const backup0 = await adminModel.findOne({ _id });
    const backup1 = await adminDetailsModel.findOne({ _id });

    // check if there is any update or not => To reduce the processing time
    if (
      backup0.email == email &&
      !require("bcrypt").compareSync(password, backup0.password) &&
      backup1.full_name == full_name &&
      backup1.contact_number == contact_number
    )
      return res
        .status(400)
        .json({ msg: "No update detected => accounts router!" });

    let hashedPassword;
    if (password) hashedPassword = require("bcrypt").hashSync(password, 10);

    await adminModel.updateOne(
      { _id },
      {
        $set: {
          email: email || backup0.email,
          password: hashedPassword || backup0.password
        }
      }
    );

    await adminDetailsModel.updateOne(
      {
        _id
      },
      {
        $set: {
          full_name: full_name || backup1.full_name,
          contact_number: contact_number || backup1.contact_number
        }
      }
    );

    res.status(200).json({ msg: "Admin details updated successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error updating admin detail => accounts router!" });
  }
});

// admin account crud ends
// --------------------------------------------------------------------------------------------------------------------------------------------

//----------------
// new student    |
//----------------

// post request for cross data reference -> php
const newStudentCrossAPI = jsonData => {
  try {
    axios.post("http://sudeepmishra.com.np/new_student", jsonData);
  } catch (error) {
    console.log(error);
  }
};

const newStudentFunc = async (data, index, passedData) => {
  const _id = require("mongoose").Types.ObjectId();
  const email =
    data
      .split(" ")
      .join("")
      .toLowerCase() +
    passedData.year +
    "@nagarjunacollege.edu.np";
  const password =
    data
      .split(" ")
      .join("")
      .toLowerCase() + passedData.year;

  const newStudent = new studentModel({
    _id,
    email,
    password
  });

  const newStudentDetail = new studentDetailsModel({
    _id,
    program_id: passedData.program_id,
    semester_id: passedData.semester_id,
    full_name: data
  });

  const emailExist = await studentModel.findOne({
    email
  });

  if (emailExist) return `${data} already exists!`;

  const newStudentStatus = await newStudent.save();
  const newStudentDetailStatus = await newStudentDetail.save();

  // posting data to web api
  const checkData = {
    _id: newStudentStatus._id,
    email: newStudentStatus.email,
    password: newStudentStatus.password,
    full_name: newStudentDetailStatus.full_name,
    program_id: newStudentDetailStatus.program_id,
    semester_id: newStudentDetailStatus.semester_id,
    created_at: newStudentStatus.created_at
  };

  newStudentCrossAPI(checkData);
};

accountRouter.post("/new-student", async (req, res) => {
  const { full_name, year, program_id, semester_id } = req.body;
  try {
    const strinfiedPassingData = {
      year,
      program_id,
      semester_id
    };

    // this is used to create and check email existancy error;
    let emailExistancyError = full_name.forEach((data, index) => {
      newStudentFunc(data, index, strinfiedPassingData)
        .then(response => {
          if (response) return `${data}'s credentials already exists!`;
        })
        .catch(err => {
          return err;
        });
    });

    // this is used to create and check email existancy error;
    if (emailExistancyError)
      return res.status(400).json({ msg: `${emailExistancyError}` });

    res.status(200).json({ msg: "Student account created successfully!" });
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg:
          "Error generating new student credentials => student account router: ./router/accounts"
      });
  }
});

//------------------
// update student   |
//------------------

const updateStudentCrossAPI = jsonData => {
  try {
    axios.post("http://sudeepmishra.com.np/api/update_profile", jsonData);
    // Note: _id is most essential for this task
  } catch (error) {
    console.log(error);
  }
};

accountRouter.patch("/update-student", async (req, res) => {
  const {
    _id,
    full_name,
    email,
    password,
    program_id,
    semester_id,
    contact_number
  } = req.body;

  const hashedPassword = require("bcrypt").hashSync(password, 10);

  try {
    // check if email exists or not
    const emailExist = await studentModel.findOne({ email });

    if (!emailExist)
      return res.status(400).json({ msg: "No student found with that email!" });

    const nochangeDetection = await require("bcrypt").compareSync(
      password,
      emailExist.password
    );

    if (nochangeDetection)
      return res.status(400).json({
        msg: "Same credentials is already used!"
      });

      // when there is somthing changed
      updateStudentCrossAPI({
        _id,
        full_name,
        email,
        password,
        program_id,
        semester_id,
        contact_number
      });

    const updateStatus = await studentModel.updateOne(
      {
        email
      },
      {
        password: hashedPassword,
        semester
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
