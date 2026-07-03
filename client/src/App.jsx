import { useEffect, useState } from "react";
import API from "./services/api";
import "./index.css";

function App() {

  const [problems, setProblems] = useState([]);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("Arrays");
  const [difficulty, setDifficulty] = useState("Easy");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await API.get("/problems");
      setProblems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {

    if (title.trim() === "") {
      alert("Please enter a problem name");
      return;
    }

    try {

      if (editingId) {

        await API.put(`/problems/${editingId}`, {
          title,
          topic,
          difficulty,
        });

      } else {

        await API.post("/problems", {
          title,
          topic,
          difficulty,
        });

      }

      setTitle("");
      setTopic("Arrays");
      setDifficulty("Easy");
      setEditingId(null);

      fetchProblems();

    } catch (err) {
      console.log(err);
    }
  };

  const deleteProblem = async (id) => {

    try {

      await API.delete(`/problems/${id}`);

      fetchProblems();

    } catch (err) {
      console.log(err);
    }

  };

  const editProblem = (problem) => {

    setTitle(problem.title);
    setTopic(problem.topic);
    setDifficulty(problem.difficulty);

    setEditingId(problem.id);

  };

  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(search.toLowerCase())
  );

  const easy = problems.filter(
    (p) => p.difficulty === "Easy"
  ).length;

  const medium = problems.filter(
    (p) => p.difficulty === "Medium"
  ).length;

  const hard = problems.filter(
    (p) => p.difficulty === "Hard"
  ).length;

  return (

    <div className="container">

      <nav>

        <h2>🚀 Momentum</h2>

        <span>DSA Progress Tracker</span>

      </nav>

      <h1>Track Your Coding Journey</h1>

      <p className="subtitle">

        Build consistency. Stay accountable.

      </p>

      <div className="stats">

        <div className="card">
          <h2>{problems.length}</h2>
          <p>Total Solved</p>
        </div>

        <div className="card">
          <h2>{easy}</h2>
          <p>Easy</p>
        </div>

        <div className="card">
          <h2>{medium}</h2>
          <p>Medium</p>
        </div>

        <div className="card">
          <h2>{hard}</h2>
          <p>Hard</p>
        </div>

      </div>

      <div className="form">

        <input
          type="text"
          placeholder="Problem Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          <option>Arrays</option>
          <option>Strings</option>
          <option>Linked List</option>
          <option>Trees</option>
          <option>Graphs</option>
          <option>Dynamic Programming</option>
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <button onClick={handleSubmit}>

          {editingId ? "Update Problem" : "Add Problem"}

        </button>

      </div>

      <input
        className="search"
        placeholder="🔍 Search Problems..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2 className="heading">

        Recent Problems

      </h2>

      {

        filteredProblems.length === 0 ?

          (

            <div className="empty">

              <h2>🚀</h2>

              <p>No Problems Logged Yet</p>

            </div>

          )

          :

          filteredProblems.map((problem) => (

            <div
              className="problem"
              key={problem.id}
            >

              <div>

                <h3>{problem.title}</h3>

                <p>{problem.topic}</p>

                <p>📅 {problem.date}</p>

                <span
                  className={`badge ${problem.difficulty.toLowerCase()}`}
                >

                  {problem.difficulty}

                </span>

              </div>

              <div className="buttons">

                <button
                  className="edit"
                  onClick={() => editProblem(problem)}
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => deleteProblem(problem.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))

      }

      <footer>

        Built with ❤️ using React + Express

      </footer>

    </div>

  );

}

export default App;