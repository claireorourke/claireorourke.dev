import type { ElementType, HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

export type CardVariant = "soft" | "sticker" | "plain";
export type CardTone = "peach" | "mint" | "butter" | "lavender" | "sky";

export interface CardProps extends HTMLAttributes<HTMLElement> {
    variant?: CardVariant;
    tone?: CardTone;
    as?: ElementType;
    interactive?: boolean;
    className?: string;
    children?: ReactNode;
    /** Extra props forwarded when `as` is a non-div element (e.g. href for as="a"). */
    href?: string;
}

/** A content container. The "sticker" variant carries the brand hard shadow. */
export function Card({
    variant = "soft",
    tone,
    as,
    interactive = false,
    className = "",
    children,
    ...props
}: CardProps) {
    const Tag = as ?? "div";
    const cls = [
        styles.card,
        styles[variant],
        tone ? styles[tone] : "",
        interactive ? styles.link : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");
    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Tag className={cls} {...(props as any)}>
            {children}
        </Tag>
    );
}
