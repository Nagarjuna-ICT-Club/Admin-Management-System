const semesterRouter = require("express").Router();

// models
const semesterModel = require("../models/Semester");

// adding new semester
semesterRouter.post("/new-semester", async (req, res) => {
  const { semester, program } = req.body;

  const newSemester = new semesterModel({
    semester,
    program
  });
  try {
    // check if semester for same program exists already
    const semesterExist = await semesterModel.findOne({
      program
    });

    if (semester === semesterExist.semester)
      return res
        .status(400)
        .json({ msg: "Semester for that program already exists!" });

    const semesterStatus = await newSemester.save();

    // if new semester is not created
    if (!semesterStatus)
      return res
        .status(400)
        .json({ msg: "Error while creating new semester!" });

    res.status(200).json({
      msg: "Semester created successfully!"
    });
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg:
          "Error while creating new semester/program => ams/routes/semester.js",
        err
      });
  }
});

// updating existing semester
// this process is very vulnerable
semesterRouter.patch("/update-semester", async (req, res) => {
  const { _id, semester, program } = req.body;
  try {
    const updatedSemesterStatus = await semesterModel.updateOne(
      {
        _id
      },
      {
        $set: {
          semester,
          program
        }
      }
    );

    // if no change is done!
    if (updatedSemesterStatus.nModified === 0)
      return res.status(400).json({ msg: "No change found!" });

    // check if there is any error
    if (!updatedSemesterStatus)
      return res.status(500).json({
        msg: "Error updating semester => ams/routes/semester"
      });

    res.status(200).json(updatedSemesterStatus);
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg: "Error updating semester derail => ams/routes/semester.js"
      });
  }
});

// deleting semester
semesterRouter.delete("/delete-semester", async (req, res) => {
  const { _id } = req.body;

  try {
    const deleteStatus = await semesterModel.deleteOne({ _id });

    if (deleteStatus.deletedCount === 0 )
      return res.status(400).json({
        msg: "Semester do not exists."
      });

      res.status(200).json({msg: "Semester deleted successfulyy!"})
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg: "Error deleting semester => ./routes/semester.js",
        ...err
      });
  }
});

module.exports = semesterRouter;
