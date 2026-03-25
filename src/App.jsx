import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AssignmentForm from "./components/AssignmentForm";
import AssignmentList from "./components/AssignmentList";
import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";
import "./App.css";


function App() {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showCourseForm, setShowCourseForm] = useState(false);

  const handleAddAssignment = (newAssignment) => {
    setAssignments(prev => [...prev, newAssignment]);
  };

  const handleToggleCompleted = (id) => {
    setAssignments(prev =>
      prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a)
    );
  };

  const addCourse = (course) => {
    setCourses([...courses, course]);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <>
      <Header />

      <div className="container">

        {/* Assignment Block */}
        <div className="assignmentform">
          <h2>Assignments</h2>
          <AssignmentForm onAdd={handleAddAssignment} />
          <AssignmentList
            assignments={assignments}
            onToggle={handleToggleCompleted}
          />
        </div>

        {/* Course Block */}
        <div className="courseform">
          <h2>Courses</h2>

          {/* Add Course Button */}
          {!showCourseForm && (
            <button
              className="show-form-btn"
              onClick={() => setShowCourseForm(true)}
            >
              Add Course
            </button>
          )}

          {/* Course Form (shown only when showCourseForm = true) */}
          {showCourseForm && (
            <div className="course-form-block">
              <CourseForm onAddCourse={(course) => {
                addCourse(course);
                setShowCourseForm(false); // close form after adding
              }} />
            </div>
          )}

          <hr />

          {/* Course List */}
          <div className = "course-list-container">
          <CourseList courses={courses} onDelete={deleteCourse} />
          </div>
        </div>

      </div>

      <Footer />
    </>
  );

}

export default App;