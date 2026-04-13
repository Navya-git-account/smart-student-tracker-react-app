function FormMessage({ type = "error", message }) {
  if (!message) return null;

  return (
    <p
      className={`form-message ${type}`}
      role={type === "error" ? "alert" : "status"}
      aria-live="polite"
    >
      {message}
    </p>
  );
}

export default FormMessage;