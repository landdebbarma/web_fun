import React from "react";
import { cn } from "@/lib/utils";

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}) => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const Tag = Component as any;

  return (
    <Tag
      className={cn(
        "bg-transparent relative text-xl  h-16 w-40 p-[1px] overflow-hidden ",
        containerClassName
      )}
      {...otherProps}
    >
      <div className="absolute inset-0" style={{ borderRadius: `inherit` }}>
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 animate-border-move",
            borderClassName
          )}
          style={{
            backgroundSize: "300% 100%",
            animationDuration: `${duration}ms`,
          }}
        />
        <div className="absolute inset-0 rounded-[inherit]">
          <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent animate-move-right" />
          <span className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent animate-move-left" />
          <span className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent animate-move-down" />
          <span className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent animate-move-up" />
        </div>
      </div>

      <div
        className={cn(
          "relative bg-slate-900 border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{
          borderRadius: `calc(inherit + 0px)`, // Match container radius
        }}
      >
        {children}
      </div>
    </Tag>
  );
};
