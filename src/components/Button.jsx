import { Link } from "react-router-dom";

function Button({
  children,
  linkToPage,
  onClick,
  variant,
  shape,
  additionalClassName,
  additionalStyle,
  disabled,
}) {
  const baseStyle =
    "w-fit h-fit cursor-pointer font-semibold text-base tracking-wide transition duration-400 ease-in-out enabled:hover:scale-105 enabled:hover:-translate-y-0.5 disabled:opacity-20 disabled:cursor-not-allowed";
  // note : pakai enabled agar style tersebut tidak mempengaruhi button ketika disabled

  const variantStyle = {
    primary: "text-primary-50 bg-primary-500 hover:bg-primary-700",
    secondary: "text-primary-700 bg-primary-100",
    danger: "text-white bg-red-500 hover:bg-red-600",
  };

  const shapeStyle = {
    default: "px-6 py-3 rounded-xl shadow-sm",
    icon: "p-2 rounded-full shadow-xs shadow-primary-500",
  };

  if (linkToPage) {
    return (
      <Link
        to={linkToPage}
        className={`${baseStyle} ${variantStyle[variant] || variantStyle.primary} ${shapeStyle[shape] || shapeStyle.default} ${additionalClassName}`}
        style={additionalStyle}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyle} ${variantStyle[variant] || variantStyle.primary} ${shapeStyle[shape] || shapeStyle.default} ${additionalClassName}`}
        style={additionalStyle}
      >
        {children}
      </button>
    );
  }
}

export default Button;
