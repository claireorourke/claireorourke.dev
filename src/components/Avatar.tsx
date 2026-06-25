import type { HTMLAttributes } from "react";

export type AvatarTone = "peach" | "mint" | "butter" | "lavender" | "sky";
export type AvatarSize = "xs" | "sm" | "md" | "lg";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
    src?: string;
    name?: string;
    size?: AvatarSize;
    tone?: AvatarTone;
    className?: string;
}

const STYLE_ID = "ds-avatar-styles";
function useStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
    .ds-avatar {
        display: inline-flex; align-items: center; justify-content: center;
        border-radius: var(--radius-pill);
        overflow: hidden;
        font-family: var(--font-display);
        font-weight: var(--weight-semibold);
        color: var(--ink-900);
        background: var(--butter);
        border: var(--border-width-bold) solid var(--ink-900);
        box-shadow: var(--shadow-retro-sm);
        flex: none;
        user-select: none;
    }
    .ds-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .ds-avatar--xs { width: 1.75rem; height: 1.75rem; font-size: 0.7rem; }
    .ds-avatar--sm { width: 2.25rem; height: 2.25rem; font-size: 0.85rem; }
    .ds-avatar--md { width: 3rem; height: 3rem; font-size: 1.05rem; }
    .ds-avatar--lg { width: 4.5rem; height: 4.5rem; font-size: 1.6rem; }
    .ds-avatar--peach { background: var(--peach); }
    .ds-avatar--mint { background: var(--mint); }
    .ds-avatar--butter { background: var(--butter); }
    .ds-avatar--lavender { background: var(--lavender); }
    .ds-avatar--sky { background: var(--sky); }
    `;
    document.head.appendChild(el);
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
    useStyles();
    const cls = ["ds-avatar", `ds-avatar--${size}`, `ds-avatar--${tone}`, className]
        .filter(Boolean)
        .join(" ");
    return (
        <span className={cls} {...props}>
            {src ? <img src={src} alt={name} /> : <span>{initials(name)}</span>}
        </span>
    );
}
