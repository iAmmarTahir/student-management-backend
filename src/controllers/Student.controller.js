const Student = require("../models/Student.model");

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

  if (req.body.constructor === Object && Object.keys(req.body).length < 7) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Student.create(new_student, function (err, student) {
      if (err) res.json({ error: true, message: err, data: null });
      res.json({
        error: false,
        message: "Student added successfully!",
        data: student,
      });
    });
  }
};

exports.findById = function (req, res) {
  Student.findByRollNumber(req.params.roll_number, function (err, student) {
    if (err) res.send(err);
    if (student.length > 0) {
      res.json({ error: false, data: student });
    } else {
      res.json({ error: true, message: "No Student found", data: student });
    }
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length < 6) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Student.update(
      req.params.roll_number,
      new Student(req.body),
      function (err, student) {
        if (err) res.send(err);
        res.json({ error: false, message: "Student successfully updated" });
      }
    );
  }
};

exports.delete = function (req, res) {
  Student.delete(req.params.roll_number, function (err, student) {
    if (err) res.send(err);
    res.json({ error: false, message: "Student successfully deleted" });
  });
};
