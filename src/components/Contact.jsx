import React, { useState } from "react";
import Button from "./Button";
import FormMessage from "./FormMessage";

function Contact() {
  // ================= STATE =================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [success, setSuccess] = useState(false); // success message
  const [error, setError] = useState("");    // error message
  const [loading, setLoading] = useState(false);   // loading state
// ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
// clear error when user types
    if (error) {
      setError("");
    }
  };
  // ================= FORM SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Please fill all fields.");
      setSuccess(false);
      return;
    }

    setError("");
    setLoading(true);

    // simulate API delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      }, 1500);
      // Reset form AFTER submission completes
      setFormData({
        name: "",
        email: "",
        phone: "",
      });
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    };

    return (
      <section className="contact-page">
        <h2>Contact Us</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <FormMessage type="error" message={error} />
          {/* Name input */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          {/* Email input */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          {/* Phone input */}
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          {/* Submit button with loading state */}
          <Button type="submit" className="submit-btn">{loading ? "Submitting..." : "Submit"}</Button>
          {/* Success message */}
          <FormMessage
            type="success"
            message={success ? "✅ Form submitted successfully!" : ""}
          />
        </form>
      </section>
    );
  }

  export default Contact;