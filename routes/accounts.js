const accountRouter = require("express").Router();

// packages
const axios = require("axios");

// models
const studentModel = require("../models/Student");
const adminModel = require("../models/Admin");
const adminDetailsModel = require("../models/AdminDetails");

//------------------------------------------------------------------------------------------------------------------------------------------
// admin account crud starts

//--------------------
// create new admin   |
//--------------------

// post request for cross data reference -> php
const crossAPI = async jsonData => {
  try {
    axios.post("http://sudeepmishra.com.np/newstudent", jsonData);
  } catch (error) {
    console.log(error);
  }
};

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
    const newAdminStatus = await newAdmin.save();
    if (!newAdminStatus)
      return res.status(400).json({ msg: "Error initializing admin data!" });

    const newAdminDetailStatus = await newAdminDetail.save();
    if (!newAdminDetailStatus)
      return res
        .status(400)
        .json({ msg: "Error initializing admin detail data!" });

    // posting data to web api
    // crossAPI({
    //   newAdmin: newAdminStatus,
    //   newAdminDetail: newAdminDetailStatus
    // });

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

    if(!adminDetail0 || !adminDetail1) return res.status(400).json({msg: "Error fetching data => accounts router!"})

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
  try{
    
  }catch(err){res.status(500).json({msg: "Error updating admin detail => accounts router!"})}
})

// admin account crud ends
// --------------------------------------------------------------------------------------------------------------------------------------------

// new student
//here student lists are required here
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
  const { password, email, semester } = req.body;

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
