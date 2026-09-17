import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps {
  className?: string;
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
  children?: React.ReactNode;
  [key: string]: any;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-slate-900 text-white shadow hover:bg-slate-800",
    secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "text-gray-950",
    success: "border-transparent bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    warning: "border-transparent bg-amber-50 text-amber-700 hover:bg-amber-100",
    danger: "border-transparent bg-red-50 text-red-700 hover:bg-red-100",
  };

  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors", variants[variant], className)} {...props} />
  )
}
export { Badge }
