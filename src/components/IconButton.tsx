import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "ghost" | "outline" | "solid";
    size?: "sm" | "md" | "lg";
    label: string;
    className?: string;
    children?: ReactNode;
}

const STYLE_ID = "ds-iconbutton-styles";
function useStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
    .ds-iconbtn {
        display: inline-flex; align-items: center; justify-content: center;
        border-radius: var(--radius-pill);
        border: var(--border-width-bold) solid transparent;
        background: transparent; color: var(--text-strong);
        cursor: pointer; padding: 0; line-height: 0;
        transition: background var(--dur-base) var(--ease-out),
            transform var(--dur-fast) var(--ease-spring),
            box-shadow var(--dur-fast) var(--ease-out);
    }
    .ds-iconbtn--sm { width: 2rem; height: 2rem; }
    .ds-iconbtn--md { width: 2.5rem; height: 2.5rem; }
    .ds-iconbtn--lg { width: 3rem; height: 3rem; }
    .ds-iconbtn:hover { background: var(--cream-100); }
    .ds-iconbtn:active { transform: scale(0.92); }
    .ds-iconbtn:focus-visible { outline: var(--border-width-bold) solid var(--focus-ring); outline-offset: 2px; }
    .ds-iconbtn--outline { border-color: var(--ink-900); background: var(--surface-card); box-shadow: var(--shadow-retro-sm); }
    .ds-iconbtn--outline:hover { background: var(--cream-100); transform: translate(-1px,-1px); box-shadow: 3px 3px 0 var(--ink-900); }
    .ds-iconbtn--outline:active { transform: translate(1px,1px); box-shadow: 1px 1px 0 var(--ink-900); }
    .ds-iconbtn--solid { background: var(--accent); color: var(--on-accent); box-shadow: var(--shadow-retro-sm); }
    .ds-iconbtn--solid:hover { background: var(--accent-hover); }
    .ds-iconbtn[disabled] { opacity: 0.45; cursor: not-allowed; box-shadow: none; }
    `;
    document.head.appendChild(el);
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
    useStyles();
    const cls = [
        "ds-iconbtn",
        `ds-iconbtn--${variant}`,
        `ds-iconbtn--${size}`,
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
