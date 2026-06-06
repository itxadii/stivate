"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function PremiumButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: PremiumButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [hovered, setHovered] = useState(false);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!buttonRef.current) return;

    const { clientX, clientY } = e;

    const {
      left,
      top,
      width,
      height,
    } = buttonRef.current.getBoundingClientRect();

    // Softer magnetic effect
    const x =
      (clientX - (left + width / 2)) * 0.12;

    const y =
      (clientY - (top + height / 2)) * 0.12;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setHovered(false);

    setPosition({
      x: 0,
      y: 0,
    });
  };

  if (variant === "secondary") {
    return (
      <StyledWrapper className={className}>
        <button className="button" {...props}>
          {children}
        </button>
      </StyledWrapper>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      className={`
        relative
        inline-flex
        items-center
        justify-center
        gap-1.5
        px-6
        py-3
        rounded-full
        font-bold
        overflow-hidden
        group
        cursor-pointer
        border
        border-zinc-300/80
        transition-all
        duration-300
        ${className}
      `}
      {...(props as any)}
    >
      {/* Solid white background */}
      <div
        className="
          absolute
          inset-0
          rounded-full
          bg-white
          transition-colors
          duration-300
        "
      />

      {/* Purple to Green Gradient Hover Fill */}
      <motion.div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#7d2ae8]
          via-[#a855f7]
          to-[#C3E236]
          rounded-full
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Subtle purple-green glow on hover */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          blur-xl
          bg-gradient-to-r
          from-[#7d2ae8]/30
          to-[#C3E236]/30
          rounded-full
          -z-10
        "
      />

      {/* Button text */}
      <span
        className={`
          relative
          z-10
          inline-flex
          items-center
          justify-center
          gap-1.5
          transition-colors
          duration-300
          ${hovered ? "text-white" : "text-zinc-900"}
        `}
      >
        {children}
      </span>
    </motion.button>
  );
}

const StyledWrapper = styled.div`
  display: inline-block;

  .button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 22px;
    border-radius: 6px;
    border: none;
    color: #fff;
    cursor: pointer;
    background-color: #7d2ae8;
    transition: all 0.2s ease;
  }

  .button:active {
    transform: scale(0.96);
  }

  .button:before,
  .button:after {
    position: absolute;
    content: "";
    width: 150%;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
    z-index: -1000;
    background-repeat: no-repeat;
  }

  .button:hover:before {
    top: -70%;
    background-image: radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, transparent 20%, #7d2ae8 20%, transparent 30%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #7d2ae8 15%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%,
      10% 10%, 18% 18%;
    background-position: 50% 120%;
    animation: greentopBubbles 0.6s ease;
  }

  @keyframes greentopBubbles {
    0% {
      background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
        40% 90%, 55% 90%, 70% 90%;
    }

    50% {
      background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
        50% 50%, 65% 20%, 90% 30%;
    }

    100% {
      background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
        50% 40%, 65% 10%, 90% 20%;
      background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
  }

  .button:hover::after {
    bottom: -70%;
    background-image: radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #7d2ae8 15%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 20% 20%, 18% 18%;
    background-position: 50% 0%;
    animation: greenbottomBubbles 0.6s ease;
  }

  @keyframes greenbottomBubbles {
    0% {
      background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
        70% -10%, 70% 0%;
    }

    50% {
      background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
        105% 0%;
    }

    100% {
      background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
        110% 10%;
      background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
  }
`;