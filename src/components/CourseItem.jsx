import Button from "./Button";

function CourseItem({ course, onDelete }) {
  return (
    <div className="course-card">
      {/* Left icon */}
      <div className="course-icon">
        📘
      </div>

      {/* Middle content */}
      <div className="course-info">
        <h4>{course.name}</h4>

        <p className="course-meta">
          {course.instructor} • {course.credits} Credits
        </p>
      </div>

      {/* Right side */}
      <div className="course-right">
        <span className={`grade grade-${course.grade}`}>
          {course.grade}
        </span>

        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(course.id)}
          ariaLabel="Delete course"
          title="Delete course"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default CourseItem;