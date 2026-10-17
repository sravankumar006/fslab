// Run with: mongosh student-management.js

const collegeDB = db.getSiblingDB("collegeDB");

if (!collegeDB.getCollectionNames().includes("students")) {
    collegeDB.createCollection("students");
}

const students = collegeDB.students;

// Insert student records.
students.insertMany([
    {
        rollNo: "23CM001",
        name: "Ravi Kumar",
        branch: "CSE-AIML",
        year: 3,
        marks: 85,
        email: "ravi@example.com"
    },
    {
        rollNo: "23CM002",
        name: "Anita Sharma",
        branch: "CSE-AIML",
        year: 3,
        marks: 92,
        email: "anita@example.com"
    },
    {
        rollNo: "23EC003",
        name: "Vikram Reddy",
        branch: "ECE",
        year: 2,
        marks: 68,
        email: "vikram@example.com"
    },
    {
        rollNo: "23IT004",
        name: "Priya Singh",
        branch: "IT",
        year: 4,
        marks: 47,
        email: "priya@example.com"
    },
    {
        rollNo: "23CS005",
        name: "Arjun Patel",
        branch: "CSE",
        year: 2,
        marks: 78,
        email: "arjun@example.com"
    }
]);

function display(title, cursor) {
    print(`\n--- ${title} ---`);
    cursor.forEach(printjson);
}

// Display all students.
display("ALL STUDENTS", students.find());

// Display students belonging to a particular branch.
display("CSE-AIML STUDENTS", students.find({ branch: "CSE-AIML" }));

// Display students who scored more than 75 marks.
display("STUDENTS SCORING MORE THAN 75", students.find({ marks: { $gt: 75 } }));

// Search for a student using rollNo.
print("\n--- SEARCH BY ROLL NUMBER: 23CM001 ---");
printjson(students.findOne({ rollNo: "23CM001" }));

// Search students using conditions on marks and year.
display("STUDENTS WITH MARKS AT LEAST 80", students.find({ marks: { $gte: 80 } }));
display("SECOND-YEAR STUDENTS", students.find({ year: 2 }));

// Update the marks of a particular student.
students.updateOne(
    { rollNo: "23CM001" },
    { $set: { marks: 88 } }
);

// Update another field of the same student.
students.updateOne(
    { rollNo: "23CM001" },
    { $set: { email: "ravi.kumar@example.com" } }
);

print("\n--- UPDATED RAVI KUMAR ---");
printjson(students.findOne({ rollNo: "23CM001" }));

// Delete a student record using rollNo.
students.deleteOne({ rollNo: "23IT004" });

// Display students in descending order of marks.
display("STUDENTS SORTED BY MARKS (DESCENDING)", students.find().sort({ marks: -1 }));

// Create an index on rollNo and show that MongoDB can use it for a rollNo search.
students.createIndex({ rollNo: 1 });

print("\n--- INDEXES ---");
students.getIndexes().forEach(printjson);

print("\n--- QUERY PLAN FOR rollNo SEARCH ---");
printjson(
    students.find({ rollNo: "23CM001" }).explain("executionStats").queryPlanner.winningPlan
);
print("The IXSCAN stage confirms that the rollNo index is used instead of scanning every document.");

// Real-time extension.
display("MARKS ABOVE 80", students.find({ marks: { $gt: 80 } }));
display("MARKS BELOW 50", students.find({ marks: { $lt: 50 } }));
display("CSE-AIML STUDENTS", students.find({ branch: "CSE-AIML" }));

print("\n--- HIGHEST-SCORING STUDENT ---");
printjson(students.find().sort({ marks: -1 }).limit(1).next());

display("ALL STUDENTS SORTED BY MARKS", students.find().sort({ marks: -1 }));
