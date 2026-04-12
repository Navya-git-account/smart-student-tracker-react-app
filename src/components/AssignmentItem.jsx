function AssignmentItem({ assignment, onToggle, onDelete, onEdit }) {

  return (
    <div className="assignment-row">
      <div className="assignment-left">
        <input
          type="checkbox"
          checked={assignment.completed}
          onChange={() => onToggle(assignment.id)}
        />

        <div>
          <p className={`assignment-title ${assignment.completed ? "completed" : ""}`}>
            {assignment.title}
          </p>
          <p className="assignment-meta">
            {assignment.subject}• Due: {new Date(assignment.deadline + "T12:00:00").toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="assignment-actions">
        <button className="icon-btn edit" onClick={() => onEdit(assignment)}>✏️</button>
        <button className="icon-btn delete" onClick={() => onDelete(assignment.id)}>
          🗑️
        </button>
      </div>
    </div>
  );
}

export default AssignmentItem;