CREATE TABLE Students (
	roll_number VARCHAR(8) NOT NULL PRIMARY KEY,
	name VARCHAR(70) NOT NULL,
	dob DATE NOT NULL,
	address VARCHAR(100) NOT NULL,
	semester INTEGER NOT NULL,
	warnings INTEGER NOT NULL,
	cgpa FLOAT NOT NULL
);

CREATE TABLE Courses (
	course_ID VARCHAR(8) NOT NULL PRIMARY KEY,
	name VARCHAR(70) NOT NULL,
	instructor VARCHAR(70) NOT NULL,
	offered_in_sem INTEGER NOT NULL,
	is_compulsory BOOLEAN NOT NULL,
	department VARCHAR(70) NOT NULL
);

CREATE TABLE StudentCourses (
	roll_number VARCHAR(8) NOT NULL,
	course_ID VARCHAR(8) NOT NULL,
	FOREIGN KEY(roll_number) REFERENCES Students(roll_number) ON DELETE CASCADE,
	FOREIGN KEY(course_ID) REFERENCES Courses(course_ID) ON DELETE CASCADE,
	PRIMARY KEY (roll_number, course_ID)
);