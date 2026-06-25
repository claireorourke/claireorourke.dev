import { useMemo } from "react";
import type { InputHTMLAttributes } from "react";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "role"> {
    label?: string;
    className?: string;
    id?: string;
}

const STYLE_ID = "ds-switch-styles";
function useStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
    .ds-switch { display: inline-flex; align-items: center; gap: var(--space-3); cursor: pointer; }
    .ds-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
    .ds-switch__track {
        position: relative; width: 3rem; height: 1.7rem; flex: none;
        background: var(--sand-200);
        border: var(--border-width-bold) solid var(--ink-900);
        border-radius: var(--radius-pill);
        transition: background var(--dur-base) var(--ease-out);
    }
    .ds-switch__thumb {
        position: absolute; top: 50%; left: 0.2rem; transform: translateY(-50%);
        width: 1.15rem; height: 1.15rem; border-radius: 999px;
        background: var(--surface-card);
        border: var(--border-width) solid var(--ink-900);
        transition: left var(--dur-base) var(--ease-spring);
    }
    .ds-switch input:checked + .ds-switch__track { background: var(--mint); }
    .ds-switch input:checked + .ds-switch__track .ds-switch__thumb { left: calc(100% - 1.35rem); }
    .ds-switch input:focus-visible + .ds-switch__track { outline: var(--border-width-bold) solid var(--focus-ring); outline-offset: 2px; }
    .ds-switch input:disabled + .ds-switch__track { opacity: 0.45; }
    .ds-switch__label { font-family: var(--font-body); color: var(--text-strong); font-size: var(--text-base); }
    `;
    document.head.appendChild(el);
}

/** An ink-outlined toggle switch; turns mint when on. */
export function Switch({ label, className = "", id, ...props }: SwitchProps) {
    useStyles();
    const autoId = useMemo(
        () => id ?? `ds-switch-${Math.random().toString(36).slice(2, 7)}`,
        [id],
    );
    return (
        <label
            className={["ds-switch", className].filter(Boolean).join(" ")}
            htmlFor={autoId}
        >
            <input id={autoId} type="checkbox" role="switch" {...props} />
            <span className="ds-switch__track" aria-hidden="true">
                <span className="ds-switch__thumb" />
            </span>
            {label ? <span className="ds-switch__label">{label}</span> : null}
        </label>
    );
}
