var dbConn = require("../../db/config");

class Course {
  constructor(course) {
    this.course_ID = course.course_ID;
    this.name = course.name;
    this.instructor = course.instructor;
    this.offered_in_sem = course.offered_in_sem;
    this.is_compulsory = course.is_compulsory;
    this.department = course.department;
  }
  static create(newCourse, result) {
    this.findByCourseID(newCourse.course_ID, function (err, course) {
      if (err) result(err, null);
      if (course.length === 0) {
        dbConn.query(
          "INSERT INTO Courses set ?",
          newCourse,
          function (err, res) {
            if (err) {
              console.log("error: ", err);
              result(err, null);
            } else {
              console.log(res.insertId);
              result(null, res.insertId);
            }
          }
        );
      } else {
        result("Course already exists", null);
      }
    });
  }
  static findByCourseID(course_ID, result) {
    dbConn.query(
      "Select * from Courses where course_ID = ? ",
      course_ID,
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          console.info("Course_ID", course_ID);
          result(null, res);
        }
      }
    );
  }
  static findAll(result) {
    dbConn.query("Select * from Courses", function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("Courses : ", res);
        result(null, res);
      }
    });
  }
  static update(course_ID, course, result) {
    dbConn.query(
      "UPDATE Courses SET name=?, instructor=?, offered_in_sem=?, is_compulsory=?, department=? WHERE course_ID = ?",
      [
        course.name,
        course.instructor,
        course.offered_in_sem,
        course.is_compulsory,
        course.department,
        course_ID,
      ],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  }
  static delete(course_ID, result) {
    dbConn.query(
      "DELETE FROM Courses WHERE course_ID = ?",
      [course_ID],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  }
}

module.exports = Course;
