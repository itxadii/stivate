import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface ModernButtonProps {
  href?: string;
  label?: string;
  children?: ReactNode;
  icon?: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function ModernButton({
  href,
  label,
  children,
  icon,
  type = "button",
  disabled,
  onClick,
  className = "",
}: ModernButtonProps) {
  const content = children || label;
  const renderIcon = icon !== undefined ? icon : <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />;

  const baseClasses = `inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-zinc-900 bg-transparent text-zinc-900 text-sm font-bold hover:bg-zinc-900 hover:text-white transition-all duration-300 group disabled:opacity-70 disabled:pointer-events-none ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
        {renderIcon}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseClasses}
    >
      {content}
      {renderIcon}
    </button>
  );
}