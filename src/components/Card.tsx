import type { ElementType, HTMLAttributes, ReactNode } from "react";

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

const STYLE_ID = "ds-card-styles";
function useStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
    .ds-card {
        display: block; text-decoration: none; color: inherit;
        background: var(--surface-card);
        border-radius: var(--radius-lg);
        padding: var(--space-5);
    }
    /* soft — ambient shadow, hairline border */
    .ds-card--soft { border: var(--border-width) solid var(--border); box-shadow: var(--shadow-card); }
    /* sticker — the signature ink outline + hard offset shadow */
    .ds-card--sticker { border: var(--border-width-bold) solid var(--ink-900); box-shadow: var(--shadow-retro); }
    /* plain — flat, just a fill */
    .ds-card--plain { border: var(--border-width) solid var(--border); }
    /* tinted grounds */
    .ds-card--peach { background: var(--peach-soft); }
    .ds-card--mint { background: var(--mint-soft); }
    .ds-card--butter { background: var(--butter-soft); }
    .ds-card--lavender { background: var(--lavender-soft); }
    .ds-card--sky { background: var(--sky-soft); }
    /* interactive lift */
    .ds-card--link { cursor: pointer; transition: transform var(--dur-base) var(--ease-spring), box-shadow var(--dur-base) var(--ease-out); }
    .ds-card--link.ds-card--sticker:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--ink-900); }
    .ds-card--link.ds-card--soft:hover { transform: translateY(-3px); box-shadow: var(--shadow-pop); }
    `;
    document.head.appendChild(el);
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
    useStyles();
    const Tag = as ?? "div";
    const cls = [
        "ds-card",
        `ds-card--${variant}`,
        tone ? `ds-card--${tone}` : "",
        interactive ? "ds-card--link" : "",
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
