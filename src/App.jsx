import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Button from "./components/Button";
import Home from "./components/Home";
import About from "./components/About";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AssignmentForm from "./components/AssignmentForm";
import AssignmentList from "./components/AssignmentList";
import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";
import Contact from "./components/Contact";

import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  /* ================= ASSIGNMENTS ================= */

  const handleAddAssignment = (newAssignment) => {
    setAssignments(prev => {
      const exists = prev.find(a => a.id === newAssignment.id);
      return exists
        ? prev.map(a => a.id === newAssignment.id ? newAssignment : a)
        : [...prev, newAssignment];
    });
    setEditingAssignment(null);
  };

  const handleToggleCompleted = (id) => {
    setAssignments(prev =>
      prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a)
    );
  };

  const handleDeleteAssignment = (id) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
  };

  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment);
  };

  const handleUpdateAssignment = (updatedAssignment) => {
    setAssignments(prev =>
      prev.map(a => a.id === updatedAssignment.id ? updatedAssignment : a)
    );
    setEditingAssignment(null);
  };

  /* ================= COURSES ================= */

  const addCourse = (course) => setCourses([...courses, course]);
  const deleteCourse = (id) => setCourses(courses.filter(c => c.id !== id));

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const points =
        course.grade === "A" ? 4 :
          course.grade === "B" ? 3 :
            course.grade === "C" ? 2 :
              course.grade === "D" ? 1 : 0;

      totalPoints += points * Number(course.credits);
      totalCredits += Number(course.credits);
    });

    return totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
  };

  /* ================= TOAST NOTIFICATIONS ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setAssignments(prev =>
        prev.map(a => {
          const deadline = new Date(a.deadline);
          const twoHours = 2 * 60 * 60 * 1000;

          if (!a.reminded && deadline - now <= twoHours && deadline - now > 0) {
            toast.info(`⏰ "${a.title}" is due soon!`, {
              toastId: a.id
            });

            return { ...a, reminded: true };
          }

          return a;
        })
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />

      <div className="container">
        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/dashboard"
            element={
              <div className="dashboard-flex">

                {/* LEFT */}
                <div className="left-column">
                  <div className="assignmentform">
                    <h2>Assignments</h2>
                    <AssignmentForm
                      onAdd={handleAddAssignment}
                      onUpdate={handleUpdateAssignment}
                      editingAssignment={editingAssignment}
                    />

                    <AssignmentList
                      assignments={assignments}
                      onToggle={handleToggleCompleted}
                      onDelete={handleDeleteAssignment}
                      onEdit={handleEditAssignment}
                    />
                  </div>
                </div>
                {/* MIDDLE */}
                <div className="middle-column">
                  <div className="middle-block">
                    <div className="gpa-block">
                      <h2>Your GPA</h2>
                      <p>{calculateGPA()}</p>
                      <small> Good Job! Keep it up.</small>
                    </div>
                    <div className="upcoming-deadline-block">
                      <h2>Next Upcoming Assignment</h2>
                      {assignments.length === 0 ? (
                        <p className="no-assignment">No upcoming assignments</p>
                      ) : (() => {
                        const now = new Date();
                        const pending = assignments.filter(a => !a.completed && new Date(a.deadline + "T23:59:59") > now);

                        if (pending.length === 0) return <p>No upcoming assignments</p>;

                        const earliestDeadline = Math.min(...pending.map(a => new Date(a.deadline + "T23:59:59").getTime()));
                        const upcomingAssignments = pending.filter(
                          a => new Date(a.deadline + "T23:59:59").getTime() === earliestDeadline
                        );

                        return upcomingAssignments.map(a => {
                          const timeLeft = Math.max(new Date(a.deadline + "T23:59:59") - now, 0);
                          const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

                          return (
                            <div className="assignment-card" key={a.id}>
                              <p className="assignment-title">{a.title}</p>
                              <p className="assignment-subject">({a.subject})</p>
                              <p className="assignment-deadline">
                                Due: {new Date(a.deadline + "T23:59:59").toLocaleString()}
                              </p>
                              <p className="assignment-countdown">⏳ Time left: {hours}h {minutes}m</p>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="right-column">
                  <div className="courseform">
                    <h2>Courses</h2>

                    {!showCourseForm && (
                      <Button className="show-form-btn" onClick={() => setShowCourseForm(true)}>
                        Add Course
                      </Button>
                    )}

                    {showCourseForm && (
                      <CourseForm onAddCourse={(course) => {
                        addCourse(course);
                        setShowCourseForm(false);
                      }} />
                    )}

                    <CourseList courses={courses} onDelete={deleteCourse} />
                  </div>
                </div>
              </div>
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;