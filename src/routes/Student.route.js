const express = require("express");
const router = express.Router();
const studentController = require("../controllers/Student.controller");

// Retrieve all student
router.get("/", studentController.findAll);

// Create a new student
router.post("/", studentController.create);

// Retrieve a single student with roll_number
router.get("/:roll_number", studentController.findById);

// Update a student with roll_number
router.put("/:roll_number", studentController.update);

// Delete a student with roll_number
router.delete("/:roll_number", studentController.delete);

module.exports = router;
