import type { ReactNode } from "react";
import { cn } from "../libs/utils";

type ButtonProps = {
  children: ReactNode;
  variant: "primary" | "secondary";
  type: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const variantClasses = {
  primary: "bg-blue text-white",
  secondary: "bg-light-blue text-blue",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <button
      className={cn(
        "rounded-md cursor-pointer",
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
