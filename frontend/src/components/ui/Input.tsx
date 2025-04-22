import React from "react";

interface InputProps {
    placeholder: string;
    type?: string;
    className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({placeholder, type = "text", className = ""}, ref) => {
        return (
            <input 
                ref={ref}
                type={type}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${className}`}
            />
        );
    }
);

Input.displayName = "Input";