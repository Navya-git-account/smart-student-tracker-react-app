import AssignmentItem from "./AssignmentItem";

function AssignmentList({ assignments, onToggle, onDelete }) {
  return (
    <section>
      <h2>Assignments List</h2>

      {assignments.length === 0 ? (
        <p>No assignments yet</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((item) => (
              <AssignmentItem
                key={item.id}
                assignment={item}
                onToggle={onToggle} // pass toggle from parent
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default AssignmentList;