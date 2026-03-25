import CourseItem from "./CourseItem";

function CourseList({ courses, onDelete }) {
  return (
    <div>
      <h3>Registered Courses</h3>

      {courses.length === 0 ? (
        <p>No courses added</p>
      ) : (
        courses.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default CourseList;