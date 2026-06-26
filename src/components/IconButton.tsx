import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "ghost" | "outline" | "solid";
    size?: "sm" | "md" | "lg";
    label: string;
    className?: string;
    children?: ReactNode;
}

/** Square, pill-rounded button holding a single icon/glyph. */
export function IconButton({
    variant = "ghost",
    size = "md",
    label,
    className = "",
    children,
    ...props
}: IconButtonProps) {
    const cls = [
        styles.iconbtn,
        styles[variant],
        styles[size],
        className,
    ]
        .filter(Boolean)
        .join(" ");
    return (
        <button className={cls} aria-label={label} {...props}>
            {children}
        </button>
    );
}
