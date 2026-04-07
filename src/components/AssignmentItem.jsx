function AssignmentItem({ assignment, onToggle, onDelete }) {
  return (
    <tr>
      <td>{assignment.title}</td>
      <td>{assignment.subject}</td>
      <td>{assignment.deadline}</td>
      <td>{assignment.completed ? "Completed" : "Pending"}</td>
      <td>
        <button onClick={() => onToggle(assignment.id)}>
          {assignment.completed ? "Undo" : "Mark Completed"}
        </button>
        &nbsp;
        <button onClick={() => onDelete(assignment.id)} style={{ color: "red" }}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default AssignmentItem;