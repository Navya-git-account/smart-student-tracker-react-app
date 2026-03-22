import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
    <>
      <Header />
      <div className="container">
        <div className="left"></div>
        <div className="right">
          <AssignmentForm onAdd={handleAddAssignment} />
          <AssignmentList
            assignments={assignments}
            onToggle={handleToggleCompleted}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}


export default App;