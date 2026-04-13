function Button({
  type = "button",
  className = "",
  onClick,
  children,
  disabled = false,
  ariaLabel,
  title,
}) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </button>
  );
}

export default Button;