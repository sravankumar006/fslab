const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// CREATE a student
router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();

        res.status(201).json({
            message: "Student added successfully",
            student
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ one student
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE a student
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({
            message: "Student updated successfully",
            student
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a student
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DEPARTMENT-WISE STUDENT ANALYTICS
router.get("/analytics/department", async (req, res) => {
    try {
        const analytics = await Student.aggregate([
            {
                $group: {
                    _id: "$department",
                    totalStudents: { $sum: 1 },
                    averageCGPA: { $avg: "$cgpa" }
                }
            },
            {
                $sort: { totalStudents: -1 }
            }
        ]);

        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;