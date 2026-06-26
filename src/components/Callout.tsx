import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Callout.module.css";

export type CalloutTone = "info" | "note" | "success" | "warn" | "alert";

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
    tone?: CalloutTone;
    icon?: ReactNode;
    className?: string;
    children?: ReactNode;
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
    const cls = [styles.callout, styles[tone], className].filter(Boolean).join(" ");
    const glyph = icon ?? DEFAULT_GLYPH[tone];
    return (
        <div className={cls} role="note" {...props}>
            {glyph ? <span className={styles.icon} aria-hidden="true">{glyph}</span> : null}
            <div className={styles.body}>{children}</div>
        </div>
    );
}
