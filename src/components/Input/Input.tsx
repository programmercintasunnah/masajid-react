import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:border-[#0b3d2e] focus:ring-1 focus:ring-[#0b3d2e] transition-colors ${
          error ? "border-red-500" : "border-gray-200"
        } ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
