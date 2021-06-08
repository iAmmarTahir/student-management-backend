const express = require("express");
const router = express.Router();
const courseController = require("../controllers/Course.controller");

// Retrieve all student
router.get("/", courseController.findAll);

// Create a new student
router.post("/", courseController.create);

// Retrieve a single student with roll_number
router.get("/:course_ID", courseController.findById);

// Update a student with roll_number
router.put("/:course_ID", courseController.update);

// Delete a student with roll_number
router.delete("/:course_ID", courseController.delete);

module.exports = router;
