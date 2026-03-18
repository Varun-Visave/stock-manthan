import React from 'react';
import { cn } from "@/lib/utils"

export interface DotPatternProps {
  className?: string;
}

export const DotPattern: React.FC<DotPatternProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full",
        "bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.5)_1px,transparent_0)]",
        "[background-size:16px_16px]",
        className
      )}
    />
  )
}