import { useState, useEffect } from "react";
import "../App.css";
import Button from "./Button";
import FormMessage from "./FormMessage";

function AssignmentForm({ onAdd, editingAssignment }) {
  // ================= STATE =================
  const [title, setTitle] = useState("");       // stores assignment title
  const [subject, setSubject] = useState("");   // stores subject name
  const [deadline, setDeadline] = useState(""); // stores selected date
  const [error, setError] = useState("");       // stores validation error

  // Get today's date (used to prevent past dates)
  const today = new Date().toISOString().split("T")[0];

  // ================= EDIT MODE =================
  // If editingAssignment exists, fill form with existing data
  useEffect(() => {
    if (editingAssignment) {
      setTitle(editingAssignment.title);
      setSubject(editingAssignment.subject);
      setDeadline(editingAssignment.deadline);
    }
  }, [editingAssignment]);

  // ================= RESET FORM =================
  // Clears all input fields and error message
  const resetForm = () => {
    setTitle("");
    setSubject("");
    setDeadline("");
    setError("");
  };

  // ================= FORM SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    // Validation: check if any field is empty
    if (!title || !subject || !deadline) {
      setError("All fields are required");
      return;
    }

    // Create new assignment object
    const newAssignment = {
      id: editingAssignment ? editingAssignment.id : Date.now(), // unique id
      title,
      subject,
      deadline,
      completed: editingAssignment ? editingAssignment.completed : false, // preserve status
      reminded: false, // used for toast notifications
    };

    // Send data to parent component (App.jsx)
    onAdd(newAssignment);

    // Reset form after submission
    resetForm();
  };

  return (
    <section className="assignment-form-section">
      <h3>Add Assignment</h3>

      {/* Display error message */}
      <FormMessage type="error" message={error} />

      <form className="assignment-form" onSubmit={handleSubmit}>
        
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Subject Input */}
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        {/* Deadline Input */}
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          min={today} // restrict past dates
        />

        {/* Submit Button */}
        <Button type="submit" className="add-btn">
          {editingAssignment ? "Update" : "Add"}
        </Button>

        {/* Cancel Button (only visible in edit mode) */}
        {editingAssignment && (
          <Button
            type="button"
            className="cancel-btn"
            onClick={resetForm}
          >
            Cancel
          </Button>
        )}
      </form>
    </section>
  );
}

export default AssignmentForm;