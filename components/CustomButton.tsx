"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  textStyles?: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

const CustomButton = ({
  title,
  containerStyles,
  textStyles,
  rightIcon,
  handleClick,
}: CustomButtonProps) => (
  <button
    disabled={false}
    type="button"
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}
  >
    <span className={`flex-1 ${textStyles}`}>
      {title}
    </span>
    {rightIcon && (
      <div className="relative w-6 h-6">
        <Image
          className="object-contain"
          src={rightIcon}
          alt=""
          fill
        />
      </div>
    )}
  </button>
);

export default CustomButton;