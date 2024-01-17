import * as React from "react";

import { cn } from "@/lib/utils";

import { Label } from "./label";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type, ...props }, ref) => {
    const input = (
      <>
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border bg-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
            error &&
              "bg-destructive/10  outline-destructive focus-visible:ring-destructive"
          )}
          ref={ref}
          {...props}
        />
        {<p className="text-xs mt-0.5 text-destructive">{error}</p>}
      </>
    );

    if (label) {
      return (
        <div className="flex flex-col gap-y-1.5">
          <Label>{label}</Label>
          {input}
        </div>
      );
    }
    return input;
  }
);
Input.displayName = "Input";

export { Input };
