import { useMemo } from "react";
import type { InputHTMLAttributes } from "react";
import styles from "./Switch.module.css";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "role"> {
    label?: string;
    className?: string;
    id?: string;
}

/** An ink-outlined toggle switch; turns mint when on. */
export function Switch({ label, className = "", id, ...props }: SwitchProps) {
    const autoId = useMemo(
        () => id ?? `ds-switch-${Math.random().toString(36).slice(2, 7)}`,
        [id],
    );
    return (
        <label
            className={[styles.switch, className].filter(Boolean).join(" ")}
            htmlFor={autoId}
        >
            <input id={autoId} type="checkbox" role="switch" {...props} />
            <span className={styles.track} aria-hidden="true">
                <span className={styles.thumb} />
            </span>
            {label ? <span className={styles.label}>{label}</span> : null}
        </label>
    );
}
