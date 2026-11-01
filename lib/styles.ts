import { tv } from "tailwind-variants";

export const button = tv({
  base: "border border-transparent rounded-[7px] px-[17px] py-[13px] font-bold text-xs cursor-pointer transition-colors",
  variants: {
    tone: {
      primary: "bg-[#10382d] text-white hover:bg-[#1c5342]",
      secondary: "bg-transparent border-[#cbd8cf] text-[#10382d]",
      ghost: "bg-transparent text-[#73807a]",
    },
    compact: { true: "px-4 py-[11px] text-[11px]" },
  },
  defaultVariants: { tone: "primary" },
});

export const status = tv({
  base: "inline-flex items-center gap-[7px] rounded px-[9px] py-[6px] text-[10px] font-bold whitespace-nowrap",
  variants: {
    state: {
      Open: "text-[#9e7314] bg-[#fff4d8]",
      "In Progress": "text-[#356a8c] bg-[#e5f2f7]",
      Resolved: "text-[#126b4c] bg-[#c8f2df]",
    },
  },
});

export const navItem = tv({
  base: "border-0 bg-transparent text-[#73807a] font-semibold text-[13px] cursor-pointer relative",
  variants: { active: { true: "text-[#10382d] after:absolute after:bottom-[-29px] after:left-0 after:right-0 after:h-[3px] after:bg-[#126b4c] after:rounded-t" } },
});
