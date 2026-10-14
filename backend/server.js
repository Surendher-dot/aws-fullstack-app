const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const tasks = [
  { id: 1, title: "Learn AWS", completed: false },
  { id: 2, title: "Deploy with Docker", completed: false },
  { id: 3, title: "Configure CloudFront", completed: false }
];

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "aws-fullstack-backend"
  });
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend listening on port ${PORT}`);
});
