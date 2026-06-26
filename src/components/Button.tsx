import type { ButtonHTMLAttributes, ElementType, ReactNode } from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    block?: boolean;
    as?: ElementType;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    className?: string;
    children?: ReactNode;
}

/**
 * Primary call-to-action button with the retro "sticker" hard-shadow motif.
 */
export function Button({
    variant = "primary",
    size = "md",
    block = false,
    as,
    leadingIcon,
    trailingIcon,
    className = "",
    children,
    ...props
}: ButtonProps) {
    const Tag = as ?? "button";
    const cls = [
        styles.btn,
        styles[variant],
        styles[size],
        block ? styles.block : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");
    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Tag className={cls} {...(props as any)}>
            {leadingIcon ? <span aria-hidden="true">{leadingIcon}</span> : null}
            {children}
            {trailingIcon ? <span aria-hidden="true">{trailingIcon}</span> : null}
        </Tag>
    );
}
