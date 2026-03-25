import { useState } from "react";

function CourseForm({ onAddCourse }) {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    instructor: "",
    credits: ""
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
      !formData.credits
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
      credits: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">Add Course</button>
    </form>
  );
}

export default CourseForm;