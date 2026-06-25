import type { HTMLAttributes, ReactNode } from "react";

export type CalloutTone = "info" | "note" | "success" | "warn" | "alert";

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
    tone?: CalloutTone;
    icon?: ReactNode;
    className?: string;
    children?: ReactNode;
}

const STYLE_ID = "ds-callout-styles";
function useStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
    .ds-callout {
        display: flex; gap: var(--space-3);
        padding: var(--space-4) var(--space-5);
        border-radius: var(--radius-md);
        border: var(--border-width-bold) solid var(--ink-900);
        box-shadow: var(--shadow-retro-sm);
        background: var(--_bg, var(--butter-soft));
        color: var(--text-strong);
        font-family: var(--font-body);
        line-height: var(--leading-normal);
    }
    .ds-callout__icon { font-family: var(--font-mono); font-weight: 700; line-height: 1.4; flex: none; }
    .ds-callout__body { font-size: var(--text-base); }
    .ds-callout__body strong { font-family: var(--font-display); }
    .ds-callout--info { --_bg: var(--sky-soft); }
    .ds-callout--note { --_bg: var(--lavender-soft); }
    .ds-callout--success { --_bg: var(--mint-soft); }
    .ds-callout--warn { --_bg: var(--butter-soft); }
    .ds-callout--alert { --_bg: var(--coral-soft); }
    `;
    document.head.appendChild(el);
}

const DEFAULT_GLYPH: Record<CalloutTone, string> = {
    info: "i",
    note: "✶",
    success: "✓",
    warn: "!",
    alert: "×",
};

/** A bordered aside for a tip, note, or status message. */
export function Callout({ tone = "note", icon, className = "", children, ...props }: CalloutProps) {
    useStyles();
    const cls = ["ds-callout", `ds-callout--${tone}`, className].filter(Boolean).join(" ");
    const glyph = icon ?? DEFAULT_GLYPH[tone];
    return (
        <div className={cls} role="note" {...props}>
            {glyph ? <span className="ds-callout__icon" aria-hidden="true">{glyph}</span> : null}
            <div className="ds-callout__body">{children}</div>
        </div>
    );
}
