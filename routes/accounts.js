const accountRouter = require("express").Router();

// packages
const axios = require("axios");

// models
const studentModel = require("../models/Student");
const studentDetailsModel = require("../models/StudentDetails");

const adminModel = require("../models/Admin");
const adminDetailsModel = require("../models/AdminDetails");

const teacherModel = require("../models/Teacher");
const teacherDetailsModel = require("../models/TeacherDetails");

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
    const emailExist = await adminModel.findOne({
      email
    });
    if (emailExist)
      return res.status(400).json({
        msg: "Admin with that email already exists"
      });

    const contactExist = await adminDetailsModel.findOne({
      contact_number
    });
    if (contactExist)
      return res.status(400).json({
        msg: "Admin with that contact number already exists"
      });

    // if no previous data exists
    await newAdmin.save();

    await newAdminDetail.save();

    res.status(200).json({
      msg: "New Admin created successfully!"
    });
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
      return res.status(400).json({
        msg: "Error fetching data => accounts router!"
      });

    res.status(200).json({
      admin: adminDetail0,
      adminDetails: adminDetail1
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error on reading admin data => accounts router!"
    });
  }
});

//--------------------
//  Update Admin      |
//--------------------

accountRouter.patch("/update-admin", async (req, res) => {
  try {
    // const _id = req.userID;//this must be used after authentication is added!
    const { _id, email, password, full_name, contact_number } = req.body;

    // backups
    const backup0 = await adminModel.findOne({
      _id
    });
    const backup1 = await adminDetailsModel.findOne({
      _id
    });

    // check if there is any update or not => To reduce the processing time
    if (
      backup0.email == email &&
      !require("bcrypt").compareSync(password, backup0.password) &&
      backup1.full_name == full_name &&
      backup1.contact_number == contact_number
    )
      return res.status(400).json({
        msg: "No update detected => accounts router!"
      });

    let hashedPassword;
    if (password) hashedPassword = require("bcrypt").hashSync(password, 10);

    await adminModel.updateOne(
      {
        _id
      },
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

    res.status(200).json({
      msg: "Admin details updated successfully!"
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error updating admin detail => accounts router!"
    });
  }
});

//--------------------
// Delete Admin      |
//--------------------

accountRouter.delete("/delete-admin", async (req, res) => {
  try {
    // const _id = req.userID;
    const { _id } = req.body;

    // check if email exists or not
    const emailExist = await adminModel.findOne({
      _id
    });

    if (!emailExist)
      return res.status(400).json({
        msg: "No admin found with that email!"
      });

    //-------------------------
    // delete auth credentials|
    //-------------------------

    const deleteStatus = await adminModel.deleteOne({
      _id
    });

    if (!deleteStatus)
      return res.status(400).json({
        msg: "Admin was not deleted!"
      });

    //-------------------------
    // delete basic credentials|
    //-------------------------

    const deleteStatus1 = await adminDetailsModel.deleteOne({
      _id
    });

    if (!deleteStatus1)
      return res.status(400).json({
        msg: "Admin was not deleted!"
      });

    res.status(200).json({
      msg: "Admin deleted successfully!"
    });
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg: "Error deleting student => ams/routes/accounts.js"
      });
  }
});

// admin account crud ends
// --------------------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------------------
// student account crud starts

//------------------
//read student      |
//------------------
accountRouter.get("/get-student", async (req, res) => {
  try {
    const studentDetails = await studentDetailsModel.find();

    if (!studentDetails)
      return res.status(400).json({
        msg: "Error while getting student data => accounts.js"
      });

    res.status(200).json(studentDetails);
  } catch (err) {
    res.status(500).json({
      msg: "Error while getting student data => accounts.js",
      err
    });
  }
});

//----------------
// new student    |
//----------------
const DOMAIN = "nagarjunacollege.edu.np";
const mongoose = require("mongoose");

const generateEmailByNameAndYear = (name, year) => {
  name = name.replace(/\s/g, "").toLowerCase();
  return `${name}${year}@${DOMAIN}`;
};

const generatePasswordByNameAndYear = (name, year) => {
  name = name.replace(/\s/g, "").toLowerCase();
  return `${name}${year}`;
};

// post request for cross data reference -> php
const newStudentCrossAPI = jsonData => {
  try {
    axios.post("http://sudeepmishra.com.np/new_student", jsonData);
  } catch (error) {
    console.log(error);
  }
};

const createStudent = async ({
  _id,
  email,
  password,
  full_name,
  program_id,
  semester_id
}) => {
  const newStudent = new studentModel({
    _id,
    email,
    password: require("bcrypt").hashSync(password, 10)
  });

  const newStudentDetail = new studentDetailsModel({
    _id,
    program_id,
    semester_id,
    full_name
  });

  let promises = [newStudent.save(), newStudentDetail.save()];
  await Promise.all(promises);
};

accountRouter.post("/new-student", async (req, res) => {
  const { full_names, year, program_id, semester_id } = req.body;

  let students = [];
  for (let full_name of full_names) {
    let student = {
      full_name
    };
    student.email = generateEmailByNameAndYear(full_name, year);
    student.password = generatePasswordByNameAndYear(full_name, year);
    students.push(student);
  }

  try {
    const oldStudents = await studentModel.find({
      email: {
        $in: students.map(student => student.email)
      }
    });
    const oldStudentEmails = oldStudents.map(student => student.email);

    // filtering new student
    const newStudents = students.filter(
      student => !oldStudentEmails.includes(student.email)
    );

    for (const student of newStudents) {
      const _id = mongoose.Types.ObjectId();
      const params = {
        _id,
        ...student,
        program_id,
        semester_id
      };
      await createStudent(params);

      params.createdAt = new Date();

      newStudentCrossAPI(JSON.stringify(params)); // try to call this api once per request
    }

    res.status(200).json({
      msg: "Student account created successfully!",
      newStudents, // delete password if you want send this to FE
      duplicates: oldStudents // student who are already exists. you can show message using this array in FE
    });
  } catch (error) {
    return res.status(500).json({
      msg: "/new-student: Error generating new student"
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
  // const _id = req.userID;//this must be used after authentication is added in frontend
  const {
    _id,
    email,
    password,
    contact_number,
    program_id,
    semester_id
  } = req.body;

  const hashedPassword = require("bcrypt").hashSync(password, 10);

  try {
    // check if email exists or not
    const emailExist = await studentModel.findOne({
      _id
    }); //note: emailexist holds the auth data

    if (!emailExist)
      return res.status(400).json({
        msg: "Error finding credentials!"
      });

    const studentDetails = await studentDetailsModel.findOne({
      _id
    });

    if (!studentDetails)
      return res.status(400).json({
        msg: "Error finding credentials!"
      });

    // when there is somthing changed
    updateStudentCrossAPI({
      _id,
      full_name: studentDetails.full_name,
      email: email || emailExist.email,
      password,
      program_id: program_id || studentDetails.program_id,
      semester_id: semester_id || studentDetails.semester_id,
      contact_number: contact_number || studentDetails.contact_number
    });

    //-------------------------------
    // update auth credentials       |
    //-------------------------------
    const updateStatus = await studentModel.updateOne(
      {
        _id
      },
      {
        email: email || emailExist.email,
        password: hashedPassword
      }
    );

    // if no change is done!
    if (updateStatus.nModified === 0)
      return res.status(400).json({
        msg: "No change found!"
      });

    // check if there is any error
    if (!updateStatus)
      return res.status(500).json({
        msg: "Error updating student => ams/routes/accounts"
      });

    //------------------------------------
    // update student basic credentials   |
    //------------------------------------
    const updateStatus1 = await studentDetailsModel.updateOne(
      {
        _id
      },
      {
        full_name: studentDetails.full_name,
        program_id: program_id || studentDetails.program_id,
        semester_id: semester_id || studentDetails.semester_id,
        contact_number: contact_number || studentDetails.contact_number
      }
    );

    // if no change is done!
    if (updateStatus1.nModified === 0)
      return res.status(400).json({
        msg: "No change found!"
      });

    // check if there is any error
    if (!updateStatus1)
      return res.status(500).json({
        msg: "Error updating student => ams/routes/accounts"
      });

    res.status(200).json({
      msg: "Student credentials updated successfully!"
    });
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg: "Error updating student credentials => ams/routes/accounts.js"
      });
  }
});

//------------------
// delete student   |
//------------------

accountRouter.delete("/delete-student", async (req, res) => {
  try {
    // const _id = req.userID;
    const { _id } = req.body;

    // check if email exists or not
    const emailExist = await studentModel.findOne({
      _id
    });

    if (!emailExist)
      return res.status(400).json({
        msg: "No student found with that email!"
      });

    //-------------------------
    // delete auth credentials|
    //-------------------------

    const deleteStatus = await studentModel.deleteOne({
      _id
    });

    if (!deleteStatus)
      return res.status(400).json({
        msg: "Student was not deleted!"
      });

    //-------------------------
    // delete basic credentials|
    //-------------------------

    const deleteStatus1 = await studentDetailsModel.deleteOne({
      _id
    });

    if (!deleteStatus1)
      return res.status(400).json({
        msg: "Student was not deleted!"
      });

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

// student account crud ends
//--------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------
//teacher account crud starts

//-----------------------------
// create teacher account     |
//-----------------------------
accountRouter.post("/new-teacher", async (req, res) => {
  const _id = require("mongoose").Types.ObjectId();
  const {
    email,
    password,
    full_name,
    contact_number,
    subject_id,
    semester_id
  } = req.body;
  //Note: Semester_id is passed as an array!

  const newTeacher = new teacherModel({
    _id,
    email,
    password: require("bcrypt").hashSync(password, 10)
  });

  const newTeacherDetail = new teacherDetailsModel({
    _id,
    full_name,
    contact_number,
    subject_id,
    semester_id
  });

  try {
    // check if email already exists or not
    const emailExist = await teacherModel.findOne({
      email
    });

    if (emailExist)
      return res.status(400).json({
        msg: "Teacher with that email already exists!"
      });

    await newTeacher.save();
    await newTeacherDetail.save();

    res.status(200).json({
      msg: "Teacher account created successfully!"
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error creatng new teacher => account router!",
      err
    });
  }
});

//---------------------------
// update teacher account   |
//---------------------------
accountRouter.patch("update-teacher", async (req, res) => {});

//teacher account crud ends
//-----------------------------------------------------------------------------------------------------------------------------------------
module.exports = accountRouter;
