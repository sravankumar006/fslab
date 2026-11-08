const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Ensure database connection for both serverless functions (Vercel) and long-running instances
async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.DB_NAME
    });
}

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({ error: "Database connection failed: " + error.message });
    }
});

app.use("/api/students", require("./routes/students"));

app.get("/api/health", (req, res) => {
    res.json({ message: "Student Management API is running!" });
});

async function startServer() {
    try {
        await connectDB();
        console.log("MongoDB Atlas connected successfully!");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log("CONNECTION ERROR:", error.message);

        if (error.reason && error.reason.servers) {
            for (const [address, server] of error.reason.servers) {
                console.log("\nServer:", address);
                console.log("Underlying error:", server.error);
            }
        }
    }
}

if (require.main === module) {
    startServer();
}

module.exports = app;
