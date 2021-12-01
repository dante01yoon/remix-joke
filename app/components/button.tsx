import React, { PropsWithChildren } from "react";
import buttonStyles from "~/styles/components/button.css";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
}

export default function Button({onClick}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      aria-label="remix-button"
      className="remix__button"
    >
      remix button!
    </button> 
  )
}

Button.styles = buttonStyles;