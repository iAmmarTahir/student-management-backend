const express = require("express");
const router = express.Router();
const studentCourseController = require("../controllers/StudentCourse.controller");

// Retrieve all student
router.get("/", studentCourseController.findAll);

// Create a new student
router.post("/", studentCourseController.create);

// Retrieve a single student with roll_number
router.get(
  "/:roll_number",
  studentCourseController.findByRollNumber
);

// Delete a student with roll_number
router.delete("/:roll_number/:course_ID", studentCourseController.delete);

module.exports = router;
