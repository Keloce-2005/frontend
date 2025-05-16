import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API_URL = "https://oceane-backend-skander.azurewebsites.net/tasks"; // change à l'adresse Azure plus tard

  useEffect(() => {
    axios.get(API_URL).then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    if (!title.trim()) return;
    axios.post(API_URL, { title }).then(res => {
      setTasks([...tasks, res.data]);
      setTitle("");
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    });
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h1>ToDo List</h1>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Nouvelle tâche"
      />
      <button onClick={addTask}>Ajouter</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
