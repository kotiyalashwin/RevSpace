import React from "react";
import { motion } from "framer-motion";

interface CornerDottedLineProps {
  width?: number;
  height?: number | string;
  dotSize?: number;
  dotColor?: string;
  spacing?: number;
  duration?: number;
}

export const CornerDottedLine: React.FC<CornerDottedLineProps> = ({
  width = 100,
  height = 100,
  dotSize = 4,
  dotColor = "bg-blue-500",
  spacing = 8,
  duration = 2,
}) => {
  const horizontalDots = Math.floor(width / spacing);
  const verticalDots = Math.floor(Number(height) / spacing);
  const totalDots = horizontalDots + verticalDots;

  const lineVariants = {
    start: { pathLength: 0 },
    end: { pathLength: 1 },
  };

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        // position: "relative",
      }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <motion.path
          d={`M0,0 H${width} V${height}`}
          fill="none"
          stroke={`url(#${dotColor})`}
          strokeWidth={dotSize}
          strokeLinecap="round"
          strokeDasharray={`0 ${spacing}`}
          variants={lineVariants}
          initial="start"
          animate="end"
          transition={{
            duration: duration,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        <defs>
          <pattern
            id={dotColor}
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={dotSize / 2}
              cy={dotSize / 2}
              r={dotSize / 2}
              fill="currentColor"
            />
          </pattern>
        </defs>
      </svg>
    </div>
  );
};
