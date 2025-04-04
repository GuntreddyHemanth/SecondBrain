import { ReactElement } from "react";


interface ButtonProps {
    variant: "primary" | "secondary";
    size?: "sm" | "md"| "lg";
    text: string;
    startIcon?:ReactElement;
    endIcon?:ReactElement;
    onClick?: () => void
    fullWidth?: boolean
    disabled?: boolean
    loading?: boolean
}

const variantStyle = {
    primary: "bg-purple-600 text-white",
    secondary:"bg-purple-300 text-purple-600"
}

const sizeStyle = {
    sm: "py-1 px-2",
    md: "py-2 px-4",
    lg: "py-4 px-6"
}

const defaultStyles = "rounded-md flex items-center font-light"

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick}  className={`${variantStyle[props.variant]} ${sizeStyle[props.size || "md"]} ${defaultStyles} ${props.fullWidth ? " w-full flex justify-center items-center": ""} ${props.loading ? "opacity-45" : ""}`} >
           {props.startIcon ? <div className="pr-2">
        {props.startIcon}</div>: null} {props.text} {props.endIcon}</button>
}
