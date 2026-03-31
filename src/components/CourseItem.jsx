function CourseItem({ course, onDelete }) {
  return (
    <div className="course-card">
      <h4>{course.name}</h4>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p><strong>Credits:</strong> {course.credits}</p>
      <p><strong>Duration:</strong> {course.startDate} → {course.endDate}</p>
      <p><strong>Grade:</strong> {course.grade}</p>
      <button onClick={() => onDelete(course.id)}>Delete</button>
    </div>
  );
}

export default CourseItem;