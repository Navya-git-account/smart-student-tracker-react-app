import { useState } from "react";

function CourseForm({ onAddCourse }) {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
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
      !formData.startDate ||
      !formData.endDate ||
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
      startDate: "",
      endDate: "",
      instructor: "",
      credits: "",
      grade: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className= "course-form" >
      <h3>Add Course</h3>

      <input
        type="text"
        name="name"
        placeholder="Course Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="endDate"
        value={formData.endDate}
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

      <button type="submit">Add Course</button>
    </form>
  );
}

export default CourseForm;