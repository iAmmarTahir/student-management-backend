const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a root route
app.get("/", (req, res) => {
  res.send("Student Managment API V1.0");
});

// Require routes
const studentRoutes = require("./src/routes/Student.route");
const courseRoutes = require("./src/routes/Course.route");
const studentCoursesRoutes = require("./src/routes/StudentCourse.route");

// using as middleware
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/studentCourses", studentCoursesRoutes);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
