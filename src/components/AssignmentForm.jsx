import { useState, useEffect } from "react";
import "../App.css";
import Button from "./Button";
import FormMessage from "./FormMessage";

function AssignmentForm({ onAdd, editingAssignment }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];


  useEffect(() => {
    if (editingAssignment) {
      setTitle(editingAssignment.title);
      setSubject(editingAssignment.subject);
      setDeadline(editingAssignment.deadline);
    }
  }, [editingAssignment]);

  const resetForm = () => {
    setTitle("");
    setSubject("");
    setDeadline("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !subject || !deadline) {
      setError("All fields are required");
      return;
    }

    const newAssignment = {
      id: editingAssignment ? editingAssignment.id : Date.now(),
      title,
      subject,
      deadline,
      completed: editingAssignment ? editingAssignment.completed : false,
    };

    onAdd(newAssignment);
    resetForm();
  };

  return (
    <section className="assignment-form-section">
      <h3>Add Assignment</h3>

      <FormMessage type="error" message={error}/>

      <form className="assignment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          min={today}
        />
        <button type="submit"
        className="add-btn">
          {editingAssignment ? "Update" : "Add"}
        </button>

        {/* ✅ Cancel button (only in edit mode) */}
        {editingAssignment && (
          <button
            type="button"
            className="cancel-btn"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </form>
    </section>
  );
}

export default AssignmentForm;