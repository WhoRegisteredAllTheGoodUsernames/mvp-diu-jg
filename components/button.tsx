import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[#002D72] text-white shadow-sm hover:bg-[#001F52]",
  secondary: "border border-slate-300 bg-white text-[#002D72] hover:border-[#002D72] hover:bg-[#EBF2FA]/40",
  ghost: "text-slate-500 hover:text-[#002D72]",
  danger: "border border-red-300 bg-red-50/50 text-[#C8102E] hover:bg-red-50",
};

export function Button({ className, variant = "primary", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-[#002D72]/30 disabled:cursor-not-allowed disabled:opacity-40",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
