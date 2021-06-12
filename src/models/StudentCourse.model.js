var dbConn = require("../../db/config");

class Student {
  constructor(student) {
    this.roll_number = student.roll_number;
    this.course_ID = student.course_ID;
  }
  static create(newStudent, result) {
    dbConn.query(
      "INSERT INTO StudentCourses set ?",
      newStudent,
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
  }

  static findAll(result) {
    dbConn.query("Select * from StudentCourses", function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("Students : ", res);

        result(null, res);
      }
    });
  }

  static findByRollNumberAndCourseID(roll_number, course_ID, result) {
    dbConn.query(
      "Select * from StudentCourses where roll_number = ? AND course_ID = ? ",
      [roll_number, course_ID],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }

  static findByRollNumber(roll_number, result) {
    console.log(roll_number);
    dbConn.query(
      "Select StudentCourses.course_ID, Courses.name from StudentCourses join Courses on StudentCourses.course_ID=Courses.course_ID where roll_number = ?",
      roll_number,
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {

          console.log(res);
          result(null, res);
        }
      }
    );
  }

  static delete(roll_number, course_ID, result) {
    dbConn.query(
      "DELETE FROM StudentCourses WHERE roll_number = ? AND course_ID = ?",
      [roll_number, course_ID],
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

module.exports = Student;
