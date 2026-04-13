function Button({
  type = "button",        // default button type
  className = "",         // custom CSS classes
  onClick,                // click handler function
  children,               // button content (text or icons)
  disabled = false,       // disable button state
  ariaLabel,              // accessibility label
  title,                  // tooltip text
}) {
  return (
    <button
      type={type}                 // button type (submit/reset/button)
      className={className}       // apply styles
      onClick={onClick}           // handle click event
      disabled={disabled}         // disable when needed
      aria-label={ariaLabel}      // accessibility support
      title={title}               // hover tooltip
    >
      {children}                  {/* dynamic content */}
    </button>
  );
}

export default Button;