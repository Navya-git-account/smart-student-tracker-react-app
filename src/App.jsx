import React, { useState } from "react";
import AssignmentForm from "./components/AssignmentForm";
import AssignmentList from "./components/AssignmentList";
import "./App.css";


function App() {
  const [assignments, setAssignments] = useState([]);

  const handleAddAssignment = (newAssignment) => {
    setAssignments(prev => [...prev, newAssignment]);
  };

  const handleToggleCompleted = (id) => {
    setAssignments(prev =>
      prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a)
    );
  };

  return (
    <div className="container">
      {/* Left empty space (or future content) */}
      <div className="left"></div>

      {/* Right side (one flex column) */}
      <div className="right">
        <AssignmentForm onAdd={handleAddAssignment} />

        <AssignmentList
          assignments={assignments}
          onToggle={handleToggleCompleted}
        />
      </div>
    </div>
  );
}

export default App;