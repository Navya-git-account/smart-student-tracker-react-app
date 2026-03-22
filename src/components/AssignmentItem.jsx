function AssignmentItem({ assignment, onToggle }) {
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
      </td>
    </tr>
  );
}

export default AssignmentItem;