/*console.log("SERVER FILE LOADED");
const express = require("express");
const candidateRoutes = require("./routes/candidateRoutes");

const app = express();

app.use(express.json());

app.use("/api/candidates", candidateRoutes);
app.get("/", (req, res) => {
  res.send("Server Working");
});
app.post("/test", (req, res) => {
  res.json({ message: "POST Working" });
});

app.listen(5000, () => {
  console.log("Server running");
});*/
const express = require("express");
const cors = require("cors");
const candidateRoutes = require("./routes/candidateRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


const app = express();
app.use(cors());

app.use("/api/dashboard", dashboardRoutes);
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

// Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});