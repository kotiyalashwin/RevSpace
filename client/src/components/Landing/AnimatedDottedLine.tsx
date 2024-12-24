import React from "react";
import { motion } from "motion/react";

interface AnimatedDottedLineProps {
  width?: number;
  height?: number;
  dotSize?: number;
  dotColor?: string;
  spacing?: number;
  duration?: number;
  direction?: "left" | "right" | "up" | "down";
}

export const AnimatedDottedLine: React.FC<AnimatedDottedLineProps> = ({
  width = 600,
  height = 2,
  dotSize = 4,
  // dotColor = "",
  spacing = 8,
  duration = 1.5,
  direction = "left",
}) => {
  const isHorizontal = direction === "left" || direction === "right";
  const lineWidth = isHorizontal ? width : height;
  // const lineHeight = isHorizontal ? height : width;
  const dots = Math.floor(lineWidth / spacing) + 1;

  const lineVariants = {
    start: {
      [isHorizontal ? "x" : "y"]:
        direction === "left" || direction === "up" ? 0 : -spacing,
    },
    end: {
      [isHorizontal ? "x" : "y"]:
        direction === "left" || direction === "up" ? -spacing : 0,
    },
  };

  return (
    <div
      className="overflow-hidden"
      style={{
        width: `${isHorizontal ? width : height}px`,
        height: `${isHorizontal ? height : width}px`,
      }}
    >
      <motion.div
        className={`flex ${isHorizontal ? "flex-row" : "flex-col"}`}
        variants={lineVariants}
        initial="start"
        animate="end"
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: duration,
        }}
      >
        {[...Array(dots)].map((_, index) => (
          <div
            key={index}
            className={`rounded-full bg-slate-400`}
            style={{
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              [isHorizontal ? "marginRight" : "marginBottom"]: `${
                spacing - dotSize
              }px`,
              flexShrink: 0,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
