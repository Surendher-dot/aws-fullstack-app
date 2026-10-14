import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("Checking backend...");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        const healthResponse = await fetch("/health");

        if (!healthResponse.ok) {
          throw new Error("Backend health check failed");
        }

        const health = await healthResponse.json();
        setStatus(`Backend: ${health.status}`);

        const tasksResponse = await fetch("/api/tasks");

        if (!tasksResponse.ok) {
          throw new Error("Unable to load tasks");
        }

        setTasks(await tasksResponse.json());
      } catch (err) {
        setStatus("Backend connection failed");
        setError(err.message);
      }
    }

    loadTasks();
  }, []);

  return (
    <main className="container">
      <h1>AWS Full-Stack Application</h1>
      <p>Frontend: React + Vite</p>
      <p className="status">{status}</p>

      {error && <p className="error">{error}</p>}

      <h2>DevOps Learning Tasks</h2>

      {tasks.length === 0 && !error && <p>Loading tasks...</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <span>{task.completed ? "Completed" : "Pending"}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
