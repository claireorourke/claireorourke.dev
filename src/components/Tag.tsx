import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Tag.module.css";

export type TagTone =
    | "peach"
    | "mint"
    | "butter"
    | "lavender"
    | "sky"
    | "neutral"
    | "outline";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    tone?: TagTone;
    dot?: boolean;
    className?: string;
    children?: ReactNode;
}

/** A small pill label — topic, category, or status keyword. */
export function Tag({ tone = "neutral", dot = false, className = "", children, ...props }: TagProps) {
    const cls = [styles.tag, styles[tone], className].filter(Boolean).join(" ");
    return (
        <span className={cls} {...props}>
            {dot ? <span className={styles.dot} aria-hidden="true" /> : null}
            {children}
        </span>
    );
}
