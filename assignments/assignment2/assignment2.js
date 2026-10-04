// ============================================================
// STUDENT INFORMATION MANAGEMENT SYSTEM
// MongoDB Practical - Friend's Version
// ============================================================

// 1. USE / CREATE DATABASE
// ============================================================

db = db.getSiblingDB("collegeDB");


// 2. CREATE COLLECTION
// ============================================================

if (!db.getCollectionNames().includes("students")) {
    db.createCollection("students");
}


// 3. INSERT STUDENT RECORDS
// ============================================================

db.students.insertMany([
    {
        rollNo: "24CS101",
        name: "Rahul Verma",
        branch: "CSE",
        year: 3,
        marks: 81,
        email: "rahul@example.com"
    },
    {
        rollNo: "24CS102",
        name: "Meghana Reddy",
        branch: "CSE-AIML",
        year: 3,
        marks: 95,
        email: "meghana@example.com"
    },
    {
        rollNo: "24CS103",
        name: "Varun Kumar",
        branch: "ECE",
        year: 2,
        marks: 72,
        email: "varun@example.com"
    },
    {
        rollNo: "24CS104",
        name: "Harini Rao",
        branch: "CSE-AIML",
        year: 3,
        marks: 48,
        email: "harini@example.com"
    },
    {
        rollNo: "24CS105",
        name: "Aditya Sharma",
        branch: "IT",
        year: 2,
        marks: 76,
        email: "aditya@example.com"
    },
    {
        rollNo: "24CS106",
        name: "Nandini Patel",
        branch: "CSE",
        year: 4,
        marks: 89,
        email: "nandini@example.com"
    }
]);


// 4. DISPLAY ALL STUDENTS
// ============================================================

print("\n--- ALL STUDENT RECORDS ---");

db.students.find().forEach(printjson);


// 5. FIND STUDENTS FROM A PARTICULAR BRANCH
// ============================================================

print("\n--- CSE-AIML STUDENTS ---");

db.students.find({
    branch: "CSE-AIML"
}).forEach(printjson);


// 6. FIND STUDENTS WITH MARKS ABOVE 75
// ============================================================

print("\n--- STUDENTS SCORING ABOVE 75 ---");

db.students.find({
    marks: { $gt: 75 }
}).forEach(printjson);


// 7. SEARCH STUDENT USING ROLL NUMBER
// ============================================================

print("\n--- SEARCH BY ROLL NUMBER ---");

db.students.findOne({
    rollNo: "24CS102"
});


// 8. SEARCH STUDENTS USING MARKS CONDITION
// ============================================================

print("\n--- STUDENTS WITH MARKS ABOVE 80 ---");

db.students.find({
    marks: { $gt: 80 }
}).forEach(printjson);


// 9. SEARCH STUDENTS BASED ON YEAR
// ============================================================

print("\n--- STUDENTS IN SECOND YEAR ---");

db.students.find({
    year: 2
}).forEach(printjson);


// 10. UPDATE MARKS OF A STUDENT
// ============================================================

print("\n--- UPDATING MEGHANA'S MARKS ---");

db.students.updateOne(
    { rollNo: "24CS102" },
    { $set: { marks: 98 } }
);

print("\n--- UPDATED STUDENT ---");

db.students.findOne({
    rollNo: "24CS102"
});


// 11. UPDATE ANOTHER FIELD - EMAIL
// ============================================================

print("\n--- UPDATING EMAIL ---");

db.students.updateOne(
    { rollNo: "24CS102" },
    { $set: { email: "meghana.reddy@example.com" } }
);

print("\n--- STUDENT AFTER EMAIL UPDATE ---");

db.students.findOne({
    rollNo: "24CS102"
});


// 12. DELETE STUDENT USING rollNo
// ============================================================

print("\n--- DELETING STUDENT 24CS105 ---");

db.students.deleteOne({
    rollNo: "24CS105"
});

print("\n--- RECORDS AFTER DELETION ---");

db.students.find().forEach(printjson);


// 13. SORT STUDENTS BY MARKS IN DESCENDING ORDER
// ============================================================

print("\n--- MARKS IN DESCENDING ORDER ---");

db.students.find()
    .sort({ marks: -1 })
    .forEach(printjson);


// 14. CREATE INDEX ON rollNo
// ============================================================

print("\n--- CREATING rollNo INDEX ---");

db.students.createIndex({
    rollNo: 1
});


// 15. DISPLAY INDEXES
// ============================================================

print("\n--- DATABASE INDEXES ---");

db.students.getIndexes().forEach(printjson);


// 16. SEARCH USING rollNo
// ============================================================

print("\n--- SEARCHING FOR ROLL NO 24CS102 ---");

db.students.find({
    rollNo: "24CS102"
}).forEach(printjson);


// ============================================================
// REAL-TIME EXTENSION
// ============================================================


// 17. STUDENTS SCORING ABOVE 80
// ============================================================

print("\n--- MARKS ABOVE 80 ---");

db.students.find({
    marks: { $gt: 80 }
}).forEach(printjson);


// 18. STUDENTS SCORING BELOW 50
// ============================================================

print("\n--- MARKS BELOW 50 ---");

db.students.find({
    marks: { $lt: 50 }
}).forEach(printjson);


// 19. HIGHEST-SCORING STUDENT
// ============================================================

print("\n--- HIGHEST-SCORING STUDENT ---");

db.students.find()
    .sort({ marks: -1 })
    .limit(1)
    .forEach(printjson);


// 20. STUDENTS FROM CSE BRANCH
// ============================================================

print("\n--- CSE STUDENTS ---");

db.students.find({
    branch: "CSE"
}).forEach(printjson);


// 21. SORT STUDENTS BY MARKS - ASCENDING
// ============================================================

print("\n--- MARKS IN ASCENDING ORDER ---");

db.students.find()
    .sort({ marks: 1 })
    .forEach(printjson);


// 22. SORT STUDENTS BY MARKS - DESCENDING
// ============================================================

print("\n--- MARKS IN DESCENDING ORDER ---");

db.students.find()
    .sort({ marks: -1 })
    .forEach(printjson);


// 23. FINAL STUDENT RECORDS
// ============================================================

print("\n--- FINAL STUDENT DATABASE ---");

db.students.find().forEach(printjson);


// ============================================================
// END OF PROGRAM
// ============================================================