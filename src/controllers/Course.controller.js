const Course = require("../models/Course.model");

exports.findAll = function (req, res) {
  Course.findAll(function (err, course) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", course);
    res.json({ error: false, data: course });
  });
};

exports.create = function (req, res) {
  const new_course = new Course(req.body);

  if (req.body.constructor === Object && Object.keys(req.body).length < 6) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Course.create(new_course, function (err, course) {
      if (err) res.json({ error: true, message: err, data: null });
      res.json({
        error: false,
        message: "Course added successfully!",
        data: course,
      });
    });
  }
};

exports.findById = function (req, res) {
  Course.findByCourseID(req.params.course_ID, function (err, course) {
    if (err) res.send(err);
    if (course.length > 0) {
      res.json({ error: false, data: course });
    } else {
      res.json({ error: true, message: "No Course found", data: course });
    }
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length < 5) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Course.findByCourseID(req.params.course_ID, function (err, course) {
      if (course.length !== 0) {
        Course.update(
          req.params.course_ID,
          new Course(req.body),
          function (err, course) {
            if (err) res.send(err);
            res.json({ error: false, message: "Course successfully updated" });
          }
        );
      } else {
        res.json({ error: false, message: "Course not found" });
      }
    });
  }
};

exports.delete = function (req, res) {
  Course.findByCourseID(req.params.course_ID, function (err, course) {
    if (course.length !== 0) {
      Course.delete(req.params.course_ID, function (err, course) {
        if (err) res.send(err);
        res.json({ error: false, message: "Course successfully deleted" });
      });
    } else {
      res.json({ error: false, message: "Course not found" });
    }
  });
};
