import { CgSpinnerTwo } from "react-icons/cg"
import { cva } from "class-variance-authority";

const button = cva(
  [
    "py-2",
    "px-4",
    "flex",
    "text-white",
    "items-center",
    "jsutify-center",
    "gap-2",
    "rounded-md",
  ],
  {
    variants: {
      variant: {
        default: [""],
      },
      color: {
        primary: ["bg-cyan-500", "hover:bg-cyan-600"],
        secondary: ["bg-orange-500", "hover:bg-orange-600"],
      },
    },
    defaultVariants: {
      variant: "default",
      color: "primary",
    },
  }
);

export default function Button({
  children,
  variant,
  color,
  isLoading,
  className,
  ...rest
}) {
  return (
    <button disabled={isLoading} {...rest} className={button({ variant, color, className })}>
      {isLoading && (
        <CgSpinnerTwo className="animate-spin" />
      )}
      {children}
    </button>
  );
}
