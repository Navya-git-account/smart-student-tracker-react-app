import React, { useState } from "react";
import Button from "./Button";
import FormMessage from "./FormMessage";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) {
      setError("");
    }
  };

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
      setFormData({
        name: "",
        email: "",
        phone: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    };

    return (
      <section className="contact-page">
        <h2>Contact Us</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <FormMessage type="error" message={error} />

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <Button type="submit" className="submit-btn">{loading ? "Submitting..." : "Submit"}</Button>

          <FormMessage
            type="success"
            message={success ? "✅ Form submitted successfully!" : ""}
          />
        </form>
      </section>
    );
  }

  export default Contact;