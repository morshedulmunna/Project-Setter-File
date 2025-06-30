import { cn } from "@/lib/utils";
import React from "react";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({
  message,
  className,
}: ErrorMessageProps) {
  return <div className={cn("text-red-500", className)}>{message}</div>;
}
