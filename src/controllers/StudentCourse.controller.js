const Student = require("../models/StudentCourse.model");

exports.findAll = function (req, res) {
  Student.findAll(function (err, student) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", student);
    res.json({ error: false, data: student });
  });
};

exports.create = function (req, res) {
  const new_student = new Student(req.body);

  if (req.body.constructor === Object && Object.keys(req.body).length < 2) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Student.create(new_student, function (err, student) {
      if (err) res.json({ error: true, message: err, data: null });
      res.json({
        error: false,
        message: "Student Course added successfully!",
        data: student,
      });
    });
  }
};

exports.findByRollNumberAndCourseID = function (req, res) {
  Student.findByRollNumberAndCourseID(
    req.params.roll_number,
    req.params.course_ID,
    function (err, student) {
      if (err) res.send(err);
      if (student.length > 0) {
        res.json({ error: false, data: student });
      } else {
        res.json({
          error: true,
          message: "No Student Courses found",
          data: student,
        });
      }
    }
  );
};

exports.delete = function (req, res) {
  Student.findByRollNumberAndCourseID(
    req.params.roll_number,
    req.params.course_ID,
    function (err, student) {
      if (err) res.send(err);
      if (student.length > 0) {
        Student.delete(
          req.params.roll_number,
          req.params.course_ID,
          function (err, student) {
            if (err) res.send(err);
            res.json({
              error: false,
              message: "Student Course successfully removed",
            });
          }
        );
      } else {
        res.json({
          error: true,
          message: "No Student Courses found",
          data: student,
        });
      }
    }
  );
};
