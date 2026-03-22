import React, { useState } from "react";
import AssignmentForm from "./components/AssignmentForm";
import AssignmentList from "./components/AssignmentList";

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
    <div>
      <AssignmentForm onAdd={handleAddAssignment} />
      <AssignmentList
        assignments={assignments}
        onToggle={handleToggleCompleted}
      />
    </div>
  );
}

export default App;