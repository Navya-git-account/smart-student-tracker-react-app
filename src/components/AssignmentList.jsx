import AssignmentItem from "./AssignmentItem";

function AssignmentList({ assignments, onToggle, onDelete, onEdit }) {
  return (
    <div className = "assignment-list">
      <h3>Assignments List</h3>

      {assignments.length === 0 ? (
        <p className= "empty-text">No assignments yet</p>
      ) : (
        assignments.map((item) => (
          <AssignmentItem
            key={item.id}
            assignment={item}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}

    </div>
  );
}

export default AssignmentList;