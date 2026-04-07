import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AssignmentForm from "./components/AssignmentForm";
import AssignmentList from "./components/AssignmentList";
import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";
import "./App.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [activePage, setActivePage] = useState("home");
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
  const handleDeleteAssignment = (id) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
  };

  const addCourse = (course) => {
    setCourses([...courses, course]);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };
  const getGradePoints = (grade) => {
    switch (grade) {
      case "A": return 4;
      case "B": return 3;
      case "C": return 2;
      case "D": return 1;
      case "F": return 0;
      default: return 0;
    }
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const points = getGradePoints(course.grade);
      totalPoints += points * Number(course.credits);
      totalCredits += Number(course.credits);
    });

    return totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
  };
  const parseLocalDeadline = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day, 23, 59, 59);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setAssignments(prevAssignments => {
        return prevAssignments.map(a => {
          const deadline = new Date(a.deadline);
          const twoHours = 2 * 60 * 60 * 1000;

          if (!a.reminded && deadline - now > 0 && deadline - now <= twoHours) {
            // Show toast notification
            toast.info(`⏰ Assignment "${a.title}" is due soon!`, {
              position: "top-right",
              autoClose: false,  //stays until use closes
              toastId: a.id,
              closeOnClick: false,
              draggable: false
            });

            return { ...a, reminded: true }; // mark as reminded
          }

          return a;
        });
      });
    }, 60000); // check every 1 minute

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <>
      {/* pass setactivepage to header for navigation */}
      <Header setActivePage={setActivePage} />

      <div className="container">
        {activePage === "home" && (
          <div className="home-page">
            <h1>Stay Organized. Stay Ahead.</h1>
            <p>
              Track assignments, monitor grades, and manage your academic progress
              all in one place. </p>
            <p> [Go to Dashboard]</p>
          </div>
        )}
        {activePage === "dashboard" && (
          <div className="dashboard-flex">
            <div className="upcoming-deadline-block">
              <h2>Next Upcoming Assignment</h2>
              {assignments.length === 0 ? (
                <p className="no-assignment">No upcoming assignments</p>
              ) : (() => {
                const now = new Date();
                const pending = assignments.filter(a => !a.completed && parseLocalDeadline(a.deadline) > now);

                if (pending.length === 0) return <p>No upcoming assignments</p>;

                const earliestDeadline = Math.min(...pending.map(a => parseLocalDeadline(a.deadline).getTime()));
                const upcomingAssignments = pending.filter(
                  a => parseLocalDeadline(a.deadline).getTime() === earliestDeadline
                );

                return upcomingAssignments.map(a => {
                  const timeLeft = Math.max(parseLocalDeadline(a.deadline) - now, 0);
                  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

                  return (
                    <div className="assignment-card" key={a.id}>
                      <p className="assignment-title">{a.title}</p>
                      <p className="assignment-subject">({a.subject})</p>
                      <p className="assignment-deadline">
                        Due: {parseLocalDeadline(a.deadline).toLocaleString()}
                      </p>
                      <p className="assignment-countdown">⏳ Time left: {hours}h {minutes}m</p>
                    </div>
                  );
                });
              })()}
            </div>
            <div className="gpa-block">
              <h2>Your GPA</h2>
              <p>{calculateGPA()}</p>
            </div>
            {/* Assignment Block */}
            <div className="assignmentform">
              <h2>Assignments</h2>
              <AssignmentForm onAdd={handleAddAssignment} />
              <AssignmentList
                assignments={assignments}
                onToggle={handleToggleCompleted}
                onDelete={handleDeleteAssignment}
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
              <div className="course-list-container">
                <CourseList courses={courses} onDelete={deleteCourse} />
              </div>
            </div>
          </div>
        )}
        {activePage === "about" && (
          <div className="about-page">
            <h2>For Students Everywhere</h2>
          </div>
        )}
        {activePage === "contact" && (
          <div className="contact-page">
            <h2>Email: support@smarttracker.com</h2>
          </div>
        )}
      </div>

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={false}   // ❗ ensures ALL toasts stay
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        closeButton={({ closeToast }) => (
          <button onClick={closeToast} style={{ color: "red", border: "none", background: "transparent" }}>
            ✖
          </button>
        )}
      />
    </>
  );

}

export default App;