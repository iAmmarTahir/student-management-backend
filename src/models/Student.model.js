var dbConn = require("../../db/config");

class Student {
  constructor(student) {
    this.roll_number = student.roll_number;
    this.name = student.name;
    this.dob = student.dob;
    this.address = student.address;
    this.semester = student.semester;
    this.warnings = student.warnings;
    this.cgpa = student.cgpa;
  }
  static create(newStudent, result) {
    this.findByRollNumber(newStudent.roll_number, function (err, student) {
      if (err) res.send(err);
      if (student.length === 0) {
        dbConn.query(
          "INSERT INTO Students set ?",
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
      } else {
        result("Student already exists", null);
      }
    });
  }
  static findByRollNumber(roll_number, result) {
    dbConn.query(
      "Select * from Students where roll_number = ? ",
      roll_number,
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          console.info("Roll_number", roll_number);
          result(null, res);
        }
      }
    );
  }
  static findAll(result) {
    dbConn.query("Select * from Students", function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("Students : ", res);
        result(null, res);
      }
    });
  }
  static update(roll_number, student, result) {
    dbConn.query(
      "UPDATE Students SET name=?, dob=?, address=?, semester=?, warnings=?, cgpa=? WHERE roll_number = ?",
      [
        student.name,
        student.dob,
        student.address,
        student.semester,
        student.warnings,
        student.cgpa,
        roll_number,
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
  static delete(roll_number, result) {
    dbConn.query(
      "DELETE FROM Students WHERE roll_number = ?",
      [roll_number],
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
