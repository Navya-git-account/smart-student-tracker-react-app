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


// Toast notification library
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
    // ================= STATE =================
  const [assignments, setAssignments] = useState([]);  // stores assignment list
  const [courses, setCourses] = useState([]); // stores courses
  const [showCourseForm, setShowCourseForm] = useState(false); // toggle course form
  const [editingAssignment, setEditingAssignment] = useState(null);  // edit mode

  /* ================= ASSIGNMENTS ================= */
// Add or update assignment
  const handleAddAssignment = (newAssignment) => {
    setAssignments(prev => {
      const exists = prev.find(a => a.id === newAssignment.id);
      return exists
        ? prev.map(a => a.id === newAssignment.id ? newAssignment : a)
        : [...prev, newAssignment];
    });
    setEditingAssignment(null);
  };
// Toggle completed status
  const handleToggleCompleted = (id) => {
    setAssignments(prev =>
      prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a)
    );
  };
 // Delete assignment
  const handleDeleteAssignment = (id) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
  };
 // Set assignment to edit mode
  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment);
  };
// Update assignment after editing
  const handleUpdateAssignment = (updatedAssignment) => {
    setAssignments(prev =>
      prev.map(a => a.id === updatedAssignment.id ? updatedAssignment : a)
    );
    setEditingAssignment(null);
  };

  /* ================= COURSES ================= */
 // Add course
  const addCourse = (course) => setCourses([...courses, course]);
 // Delete course 
  const deleteCourse = (id) => setCourses(courses.filter(c => c.id !== id));
 // Calculate GPA dynamically
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

  // Convert date string to local end-of-day time
  const getLocalDeadline = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day, 23, 59, 59);
  };
  useEffect(() => {
    // Function to check upcoming assignments
  const checkUpcomingToast = () => {
    const now = new Date();

    setAssignments((prev) => {
      // Filter only incomplete and future assignments
      const pending = prev.filter(
        (a) => !a.completed && getLocalDeadline(a.deadline) > now
      );

      if (pending.length === 0) return prev;
      // Sort by nearest deadline
      pending.sort(
        (a, b) => getLocalDeadline(a.deadline) - getLocalDeadline(b.deadline)
      );
       // Get nearest assignment
      const nextAssignment = pending[0];
      const deadline = getLocalDeadline(nextAssignment.deadline);
      const oneDay = 24 * 60 * 60 * 1000;  // 24 hours
      // Show toast if within 1 day and not already notified
      if (
        !nextAssignment.reminded &&
        deadline - now > 0 &&
        deadline - now <= oneDay
      ) {
        toast.info(`⏰ "${nextAssignment.title}" is due soon!`, {
          toastId: nextAssignment.id,
        });
        // Mark as reminded
        return prev.map((a) =>
          a.id === nextAssignment.id ? { ...a, reminded: true } : a
        );
      }

      return prev;
    });
  };
  // Run immediately when component loads
  checkUpcomingToast();
  // Run every 1 minute
  const interval = setInterval(checkUpcomingToast, 60000);
   // Cleanup interval
  return () => clearInterval(interval);
}, []);

  return (
    <>
      {/* Header */}
      <Header />

      <div className="container">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />
          {/* Dashboard */}
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
                    {/* GPA Section */}
                    <div className="gpa-block">
                      <h2>Your GPA</h2>
                      <p>{calculateGPA()}</p>
                      <small> Good Job! Keep it up.</small>
                    </div>
                    {/* Upcoming Assignment Section */}
                    <div className="upcoming-deadline-block">
                      <h2>Next Upcoming Assignment</h2>
                      {assignments.length === 0 ? (
                        <p className="no-assignment">No upcoming assignments</p>
                      ) : (() => {
                        const now = new Date();
                        // Filter pending assignments
                        const pending = assignments.filter(a => !a.completed && getLocalDeadline(a.deadline) > now);

                        if (pending.length === 0) return <p>No upcoming assignments</p>;
                        // Find earliest deadline
                        const earliestDeadline = Math.min(...pending.map(a => getLocalDeadline(a.deadline).getTime()));
                        // Get assignments with earliest deadline
                        const upcomingAssignments = pending.filter(
                          a => new Date(a.deadline + "T23:59:59").getTime() === earliestDeadline
                        );

                        return upcomingAssignments.map(a => {
                          const timeLeft = Math.max(getLocalDeadline(a.deadline) - now, 0);
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
          {/* About Page */}
          <Route path="/about" element={<About />} />
          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />

        </Routes>
      </div>
      {/* Footer */}
      <Footer />
       {/* Toast Container */}
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