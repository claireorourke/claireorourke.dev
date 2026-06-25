import type { ButtonHTMLAttributes, ElementType, ReactNode } from "react";

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

/* Inject component styles once. Uses design-system CSS custom properties. */
const STYLE_ID = "ds-button-styles";
function useButtonStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
    .ds-btn {
        --_bg: var(--accent);
        --_fg: var(--on-accent);
        --_bd: transparent;
        display: inline-flex; align-items: center; justify-content: center;
        gap: var(--space-2);
        font-family: var(--font-display);
        font-weight: var(--weight-medium);
        line-height: 1;
        border: var(--border-width-bold) solid var(--_bd);
        background: var(--_bg);
        color: var(--_fg);
        border-radius: var(--radius-pill);
        cursor: pointer;
        text-decoration: none;
        white-space: nowrap;
        transition: transform var(--dur-fast) var(--ease-spring),
            box-shadow var(--dur-fast) var(--ease-out),
            background var(--dur-base) var(--ease-out);
    }
    .ds-btn:focus-visible { outline: var(--border-width-bold) solid var(--focus-ring); outline-offset: 3px; }
    /* sizes */
    .ds-btn--sm { font-size: var(--text-sm); padding: 0.5rem 0.9rem; }
    .ds-btn--md { font-size: var(--text-base); padding: 0.7rem 1.25rem; }
    .ds-btn--lg { font-size: var(--text-md); padding: 0.9rem 1.6rem; }
    /* primary — coral sticker */
    .ds-btn--primary { --_bg: var(--accent); --_fg: var(--on-accent); box-shadow: var(--shadow-retro); }
    .ds-btn--primary:hover { --_bg: var(--accent-hover); transform: translate(-1px,-1px); box-shadow: 4px 4px 0 var(--ink-900); }
    .ds-btn--primary:active { transform: translate(2px,2px); box-shadow: 1px 1px 0 var(--ink-900); }
    /* secondary — paper with ink outline sticker */
    .ds-btn--secondary { --_bg: var(--surface-card); --_fg: var(--text-strong); --_bd: var(--ink-900); box-shadow: var(--shadow-retro); }
    .ds-btn--secondary:hover { --_bg: var(--cream-100); transform: translate(-1px,-1px); box-shadow: 4px 4px 0 var(--ink-900); }
    .ds-btn--secondary:active { transform: translate(2px,2px); box-shadow: 1px 1px 0 var(--ink-900); }
    /* ghost — quiet */
    .ds-btn--ghost { --_bg: transparent; --_fg: var(--text-strong); --_bd: transparent; }
    .ds-btn--ghost:hover { --_bg: var(--cream-100); }
    .ds-btn--ghost:active { transform: scale(0.97); }
    .ds-btn[disabled], .ds-btn[aria-disabled="true"] {
        cursor: not-allowed; opacity: 0.45; box-shadow: none; transform: none; pointer-events: none;
    }
    .ds-btn--block { width: 100%; }
    `;
    document.head.appendChild(el);
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
    useButtonStyles();
    const Tag = as ?? "button";
    const cls = [
        "ds-btn",
        `ds-btn--${variant}`,
        `ds-btn--${size}`,
        block ? "ds-btn--block" : "",
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
