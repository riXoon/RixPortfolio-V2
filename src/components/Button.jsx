import React from "react";

const Button = ({ text, styles, children, round, type, onClick, disabled }) => (
  <button
    className={`relative inline-flex lg:h-10 h-8 overflow-hidden rounded-md ${round} p-[1px] ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:shadow-[#412F84]/30"
      } transition duration-300 ease-in-out`}
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
    type={type}
  >
    <span
      className={`absolute inset-[-1000%] ${disabled ? "" : "animate-[spin_2s_linear_infinite]"
        } bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]`}
    />
    <span
      className={`inline-flex h-full w-full items-center justify-center transition duration-300 ease-in-out rounded-md bg-base px-3 lg:px-3.5 py-1 text-xs lg:text-sm font-medium text-white backdrop-blur-3xl gap-2 ${styles
        }`}
    >
      {text}
      {children}
    </span>
  </button>
);

export default Button;
