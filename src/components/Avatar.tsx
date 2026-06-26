import type { HTMLAttributes } from "react";
import styles from "./Avatar.module.css";

export type AvatarTone = "peach" | "mint" | "butter" | "lavender" | "sky";
export type AvatarSize = "xs" | "sm" | "md" | "lg";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
    src?: string;
    name?: string;
    size?: AvatarSize;
    tone?: AvatarTone;
    className?: string;
}

function initials(name = "") {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0] ?? "")
        .join("")
        .toUpperCase();
}

/** Round, ink-outlined avatar. Shows an image, or falls back to initials. */
export function Avatar({ src, name = "", size = "md", tone = "butter", className = "", ...props }: AvatarProps) {
    const cls = [styles.avatar, styles[size], styles[tone], className]
        .filter(Boolean)
        .join(" ");
    return (
        <span className={cls} {...props}>
            {src ? <img src={src} alt={name} /> : <span>{initials(name)}</span>}
        </span>
    );
}
