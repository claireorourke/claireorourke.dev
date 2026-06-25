import type { HTMLAttributes, ReactNode } from "react";

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

const STYLE_ID = "ds-tag-styles";
function useStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
    .ds-tag {
        display: inline-flex; align-items: center; gap: var(--space-2);
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        letter-spacing: 0.02em;
        padding: 0.3rem 0.7rem;
        border-radius: var(--radius-pill);
        background: var(--_bg, var(--sand-200));
        color: var(--_fg, var(--ink-700));
        border: var(--border-width) solid var(--_bd, transparent);
        white-space: nowrap;
    }
    .ds-tag--peach { --_bg: var(--peach-soft); --_fg: var(--peach-ink); }
    .ds-tag--mint { --_bg: var(--mint-soft); --_fg: var(--mint-ink); }
    .ds-tag--butter { --_bg: var(--butter-soft); --_fg: var(--butter-ink); }
    .ds-tag--lavender { --_bg: var(--lavender-soft); --_fg: var(--lavender-ink); }
    .ds-tag--sky { --_bg: var(--sky-soft); --_fg: var(--sky-ink); }
    .ds-tag--neutral { --_bg: var(--sand-200); --_fg: var(--ink-700); }
    .ds-tag--outline { --_bg: transparent; --_fg: var(--ink-900); --_bd: var(--ink-900); }
    .ds-tag__dot { width: 0.5rem; height: 0.5rem; border-radius: 999px; background: currentColor; }
    `;
    document.head.appendChild(el);
}

/** A small pill label — topic, category, or status keyword. */
export function Tag({ tone = "neutral", dot = false, className = "", children, ...props }: TagProps) {
    useStyles();
    const cls = ["ds-tag", `ds-tag--${tone}`, className].filter(Boolean).join(" ");
    return (
        <span className={cls} {...props}>
            {dot ? <span className="ds-tag__dot" aria-hidden="true" /> : null}
            {children}
        </span>
    );
}
