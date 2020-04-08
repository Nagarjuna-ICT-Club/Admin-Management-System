const semesterRouter = require("express").Router();

// models
const semesterModel = require("../models/Semester");

// adding new semester
semesterRouter.get("/get-semester", async (req, res) => {
  const semesters = await semesterModel.find();

  res.status(200).json({
    semesters,
  });
});

semesterRouter.get("/get-first-semester", async (req, res) => {
  try{
    const firstSemester = await semesterModel.find({
      semester: "first"
    });

    res.status(200).json({
      firstSemester
    })
  }catch(err){
    if(err) res.status(500).json({msg: "Internal Server Error => /get-first-semester"})
  }
})

semesterRouter.post("/new-semester", async (req, res) => {
  try{
    const {semesters, program} = req.body;

    for(let semester of semesters){
      // check if semester already exists
      const semExist = await semesterModel.find({
        program
      })
      if(semExist) return res.status(400).json({msg: "Program already exists"});

      const newSemester = new semesterModel({
        semester,
        program
      })

      const newData = await newSemester.save();
      if(!newData) res.status(400).json({
        msg: "No new semester!"
      })
    }

    res.status(200).json({
      msg: "Semesters added successfully!"
    })
  }catch(err){
    if(err) res.status(500).json({
      msg:"Inernal Server Error => /new-semester"
    })
  }
});

// updating existing semester
// this process is very vulnerable
semesterRouter.patch("/update-semester", async (req, res) => {
  const { _id, semester, program } = req.body;
  try {
    const updatedSemesterStatus = await semesterModel.updateOne(
      {
        _id,
      },
      {
        $set: {
          semester,
          program,
        },
      }
    );

    // if no change is done!
    if (updatedSemesterStatus.nModified === 0)
      return res.status(400).json({ msg: "No change found!" });

    // check if there is any error
    if (!updatedSemesterStatus)
      return res.status(500).json({
        msg: "Error updating semester => ams/routes/semester",
      });

    res.status(200).json(updatedSemesterStatus);
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg: "Error updating semester derail => ams/routes/semester.js",
      });
  }
});

// deleting semester
semesterRouter.delete("/delete-semester", async (req, res) => {
  const { _id } = req.body;

  try {
    const deleteStatus = await semesterModel.deleteOne({ _id });

    if (deleteStatus.deletedCount === 0)
      return res.status(400).json({
        msg: "Semester do not exists.",
      });

    res.status(200).json({ msg: "Semester deleted successfulyy!" });
  } catch (err) {
    if (err)
      return res.status(500).json({
        msg: "Error deleting semester => ./routes/semester.js",
        ...err,
      });
  }
});

module.exports = semesterRouter;
