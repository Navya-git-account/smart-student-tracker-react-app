import { useState } from "react";
import Button from "./Button";
import FormMessage from "./FormMessage";
import "../App.css";

function CourseForm({ onAddCourse }) {
  const [formData, setFormData] = useState({
    name: "",
    instructor: "",
    credits: "",
    grade: "",
  });
  const [error, setError] = useState("");  // validation error message
  // Updates the correct field in formData when user types/selects
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error message once user starts correcting input
    if (error) {
      setError("");
    }
  };
  // ================= HANDLE SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    // Validate all fields
    if (
      !formData.name.trim() ||
      !formData.instructor.trim() ||
      !formData.credits ||
      !formData.grade
    ) {
      setError("All fields are required.");
      return;
    }
    // Send new course data to parent component
    onAddCourse({
      id: Date.now(),
      ...formData,
    });
    // Reset form after successful submission
    setFormData({
      name: "",
      instructor: "",
      credits: "",
      grade: "",
    });
    setError("");
  };

  return (
    <form  onSubmit={handleSubmit} className="course-form">
      <FormMessage type="error" message={error} />

      <input
        type="text"
        name="name"
        placeholder="Course Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="instructor"
        placeholder="Instructor Name"
        value={formData.instructor}
        onChange={handleChange}
      />

      <input
        type="number"
        name="credits"
        placeholder="Credits"
        value={formData.credits}
        onChange={handleChange}
        min="1"
      />

      <select
        name="grade"
        value={formData.grade}
        onChange={handleChange}
      >
        <option value="">Select Grade</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
      </select>

      <Button className="addcourse-btn" type="submit">Add Course</Button>
    </form>
  );
}

export default CourseForm;