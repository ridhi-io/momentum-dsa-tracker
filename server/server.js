const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Temporary Database
let problems = [
  {
    id: 1,
    title: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
    date: new Date().toLocaleDateString(),
  },
];

// GET ALL PROBLEMS
app.get("/problems", (req, res) => {
  res.json(problems);
});

// ADD PROBLEM
app.post("/problems", (req, res) => {
  const newProblem = {
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    ...req.body,
  };

  problems.push(newProblem);

  res.status(201).json(newProblem);
});

// UPDATE PROBLEM
app.put("/problems/:id", (req, res) => {
  const id = Number(req.params.id);

  problems = problems.map((problem) => {
    if (problem.id === id) {
      return {
        ...problem,
        ...req.body,
      };
    }
    return problem;
  });

  res.json({
    message: "Problem Updated Successfully",
  });
});

// DELETE PROBLEM
app.delete("/problems/:id", (req, res) => {
  const id = Number(req.params.id);

  problems = problems.filter((problem) => problem.id !== id);

  res.json({
    message: "Problem Deleted Successfully",
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});