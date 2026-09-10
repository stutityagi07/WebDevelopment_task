import './App.css';
import { useState } from 'react';
function App() {
  const [task, setTask] = useState([""]);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
function addTask() {
  if (task.trim() === "") {return;}
  setTasks([...tasks, {text:task,completed:false}]);
  setTask("");
}
function deleteTask(index) {
  setTasks(tasks.filter((task, i) => i !== index));
}
function toggleTask(index) {
  setTasks(
    tasks.map((task, i) =>
      i === index
        ? { ...task, completed: !task.completed }
        : task
    )
  );
}
const filteredTasks = tasks.filter((task) => {
  if (filter === "all") {
    return true;
  }

  if (filter === "completed") {
    return task.completed === true;
  }

  if (filter === "pending") {
    return task.completed === false;
  }
});
const completedTasks = tasks.filter((task) => task.completed).length;

const progress =
  tasks.length === 0
    ? 0
    : Math.round((completedTasks / tasks.length) * 100);
return (
  <div className="app">
    <h1>Study Task Tracker</h1>
    <p>Manage your study tasks</p>

    <input
      placeholder="Enter a study task..."
      value={task}
      onChange={(event) => setTask(event.target.value)}
      onKeyDown={(event) => {
  if (event.key === "Enter") {
    addTask();
  }
}}
    />

    <button onClick={addTask}>
      Add Task
    </button>

    <div className="filters">
      <button className={filter === "all" ? "active" : ""}
      onClick={() => setFilter("all")}>All</button>
      <button className={filter === "completed" ? "active" : ""}
      onClick={() => setFilter("completed")}>Completed</button>
      <button className={filter === "pending" ? "active" : ""}
      onClick={() => setFilter("pending")}>Pending</button>
    </div>

    <div className="stats">
      <div className="progress-section">
  <div className="progress-header">
    <span>Study Progress</span>
    <strong>{progress}%</strong>
  </div>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
</div>
      <div className="stat-card">
        <span>Total</span>
        <strong>{tasks.length}</strong>
      </div>

      <div className="stat-card">
        <span>Pending</span>
        <strong>
          {tasks.filter((task) => !task.completed).length}
        </strong>
      </div>

      <div className="stat-card">
        <span>Completed</span>
        <strong>
          {tasks.filter((task) => task.completed).length}
        </strong>
      </div>
    </div>
    
    {filteredTasks.length === 0 ? (
  <p className="empty-message">
    No tasks here. Add one and start studying! 📚
  </p>
) : (
  filteredTasks.map((task, index) => (
    <div className="task-card" key={index}>
      <p
        className={task.completed ? "completed" : ""}
        onClick={() => toggleTask(index)}
      >
        {task.completed ? "✅ " : "⬜ "}
        {task.text}
      </p>

      <button onClick={() => deleteTask(index)}>
        Delete
      </button>
    </div>
  ))
)}
</div>
);
} 


export default App;