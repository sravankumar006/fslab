const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/api/students", require("./routes/students"));

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({ message: "Student Management API is running!" });
});

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME
        });

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

startServer();