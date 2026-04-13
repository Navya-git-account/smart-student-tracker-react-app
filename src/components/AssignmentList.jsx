import AssignmentItem from "./AssignmentItem";

function AssignmentList({ assignments, onToggle, onDelete, onEdit }) {

  return (
    <div className="assignment-list">

      {/* Section Title */}
      <h3>Assignments List</h3>

      {/* Conditional Rendering:
          If no assignments → show message
          Else → display list */}
      {assignments.length === 0 ? (

        // Empty state message
        <p className="empty-text">No assignments yet</p>

      ) : (

        // Loop through assignments and render each item
        assignments.map((item) => (
          <AssignmentItem
            key={item.id}            // unique key for React rendering
            assignment={item}        // pass assignment data
            onToggle={onToggle}      // toggle complete
            onDelete={onDelete}      // delete assignment
            onEdit={onEdit}          // edit assignment
          />
        ))
      )}

    </div>
  );
}

export default AssignmentList;