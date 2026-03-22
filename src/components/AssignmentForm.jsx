import { useState } from "react";

function AssignmentForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !subject || !deadline) {
      setError("All fields are required");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      deadline,
      completed: false,
    };

    onAdd(newAssignment);

    // Reset form
    setTitle("");
    setSubject("");
    setDeadline("");
    setError("");
  };

  return (
    <section>
      <h2>Add Assignment</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
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
          min={today} // <-- Now works correctly
        />

        <button type="submit">Add</button>
      </form>
    </section>
  );
}

export default AssignmentForm;