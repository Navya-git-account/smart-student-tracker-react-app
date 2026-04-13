import Button from "./Button";

function AssignmentItem({ assignment, onToggle, onDelete, onEdit }) {

  return (
    <div className="assignment-row">

      {/* LEFT SECTION: Checkbox + Details */}
      <div className="assignment-left">

        {/* Checkbox to mark assignment as completed */}
        <input
          type="checkbox"
          checked={assignment.completed}
          onChange={() => onToggle(assignment.id)}
        />

        {/* Assignment Details */}
        <div>

          {/* Title (strikethrough if completed) */}
          <p
            className={`assignment-title ${
              assignment.completed ? "completed" : ""
            }`}
          >
            {assignment.title}
          </p>

          {/* Subject + Deadline */}
          <p className="assignment-meta">
            {assignment.subject} • Due:{" "}
            {new Date(assignment.deadline + "T12:00:00").toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* RIGHT SECTION: Action Buttons */}
      <div className="assignment-actions">

        {/* Edit Button */}
        <button
          type="button"
          className="icon-btn edit"
          onClick={() => onEdit(assignment)}
          aria-label="Edit assignment"   
          title="Edit assignment"
        >
          ✏️
        </button>

        {/* Delete Button */}
        <button
          type="button"
          className="icon-btn delete"
          onClick={() => onDelete(assignment.id)}
          aria-label="Delete assignment"  
          title="Delete assignment"
        >
          🗑
        </button>

      </div>
    </div>
  );
}

export default AssignmentItem;