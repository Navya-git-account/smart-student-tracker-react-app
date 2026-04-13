import { useState } from "react";

function CourseForm({ onAddCourse }) {
  const [formData, setFormData] = useState({
    name: "",
    instructor: "",
    credits: "",
    grade: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.instructor ||
      !formData.credits ||
      !formData.grade
    ) {
      alert("All fields are required");
      return;
    }

    onAddCourse({
      id: Date.now(),
      ...formData
    });

    // Reset form
    setFormData({
      name: "",
      instructor: "",
      credits: "",
      grade: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="course-form" >
      <input
        type="text"
        name="name"
        placeholder="Course Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="instructor"
        placeholder="Instructor Name"
        value={formData.instructor}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="credits"
        placeholder="Credits"
        value={formData.credits}
        onChange={handleChange}
        required
      />
      <select
        style={{
          width: "30%",
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          backgroundColor: "white"
        }}
        name="grade"
        value={formData.grade}
        onChange={handleChange}
        required
      >
        <option value="">Select Grade</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
      </select>

      <button type="submit" className="addcourse-btn ">Add Course</button>
    </form>
  );
}

export default CourseForm;