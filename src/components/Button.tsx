import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  containerClass?: string;
  id?: string;
  title?: string;
  rightIcon?: React.ReactNode;
}

const Button = ({
  leftIcon,
  containerClass,
  title,
  id,
  rightIcon,
  ...props
}: ButtonProps) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
      {...props}
    >
      {leftIcon && <span className="">{leftIcon}</span>}
      <span className="relative inline-flex overflow-hidden font-robert-re text-xs uppercase">
        <div className="flex leading-none">{title}</div>
      </span>
      {rightIcon && <span className="">{rightIcon}</span>}
    </button>
  );
};

export default Button;
