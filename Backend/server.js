
const express = require("express");
const cors = require("cors");
const candidateRoutes = require("./routes/candidateRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const applicationRoutes = require("./routes/applicationRoutes");


const app = express();
app.use(cors());

const path = require("path");
// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("ATS Backend Running 🚀");
});

app.get("/test-get", (req, res) => {
  res.send("GET Working");
});

// Routes
app.use("/api/candidates", candidateRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/employees",employeeRoutes);
app.use("/api/applications",applicationRoutes);
app.use("/api/jobs", require("./routes/jobRoutes"));

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
/*interview*/
const interviewRoutes = require("./routes/interviewRoutes");

app.use("/api/interviews", interviewRoutes);
