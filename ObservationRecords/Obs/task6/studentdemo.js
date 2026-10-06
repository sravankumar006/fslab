/**
 * Question 5: JavaScript Classes vs Functions
 * Demonstrates blueprint creation and instantiation of multiple objects.
 */

// Class Definition (Blueprint)
class Student {
  constructor(name, rollNo, branch) {
    this.name = name;
    this.rollNo = rollNo;
    this.branch = branch;
  }

  // Method attached to Student.prototype
  displayDetails() {
    console.log(`[Student Profile] Name: ${this.name} | Roll No: ${this.rollNo} | Branch: ${this.branch}`);
  }

  calculateGrade(marks) {
    if (marks >= 90) return 'A+';
    if (marks >= 75) return 'A';
    if (marks >= 60) return 'B';
    return 'C';
  }
}

// Instantiating multiple distinct instances
const student1 = new Student("Sravan", "21A91A0501", "CSE (AI & ML)");
const student2 = new Student("Rahul", "21A91A0502", "ECE");

// Testing Methods
student1.displayDetails();
console.log(`Grade: ${student1.calculateGrade(92)}`);

student2.displayDetails();
console.log(`Grade: ${student2.calculateGrade(78)}`);