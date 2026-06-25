import { useMemo } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseInputProps = InputHTMLAttributes<HTMLInputElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface InputProps extends Omit<BaseInputProps, "id"> {
    label?: string;
    hint?: string;
    invalid?: boolean;
    multiline?: boolean;
    id?: string;
    className?: string;
}

const STYLE_ID = "ds-field-styles";
function useStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
    .ds-field { display: flex; flex-direction: column; gap: var(--space-2); }
    .ds-field__label {
        font-family: var(--font-mono); font-size: var(--text-xs);
        letter-spacing: var(--tracking-label); text-transform: uppercase;
        color: var(--text-muted);
    }
    .ds-field__control {
        font-family: var(--font-body); font-size: var(--text-base);
        color: var(--text-strong);
        background: var(--surface-card);
        border: var(--border-width-bold) solid var(--ink-900);
        border-radius: var(--radius-md);
        padding: 0.7rem 0.9rem;
        box-shadow: var(--shadow-retro-sm);
        transition: box-shadow var(--dur-fast) var(--ease-out),
            transform var(--dur-fast) var(--ease-out);
        width: 100%;
    }
    .ds-field__control::placeholder { color: var(--text-faint); }
    .ds-field__control:focus {
        outline: none; transform: translate(-1px,-1px);
        box-shadow: 3px 3px 0 var(--accent);
    }
    textarea.ds-field__control { resize: vertical; min-height: 7rem; line-height: var(--leading-normal); }
    .ds-field__control[disabled] { opacity: 0.5; box-shadow: none; cursor: not-allowed; }
    .ds-field--invalid .ds-field__control { box-shadow: 2px 2px 0 var(--critical); border-color: var(--critical); }
    .ds-field__hint { font-size: var(--text-sm); color: var(--text-muted); }
    .ds-field--invalid .ds-field__hint { color: var(--critical); }
    `;
    document.head.appendChild(el);
}

let _id = 0;

/** Labelled text input. Pass `multiline` to render a textarea. */
export function Input({
    label,
    hint,
    invalid = false,
    multiline = false,
    id,
    className = "",
    ...props
}: InputProps) {
    useStyles();
    const autoId = useMemo(() => id ?? `ds-input-${++_id}`, [id]);
    const Control = multiline ? "textarea" : "input";
    const cls = ["ds-field", invalid ? "ds-field--invalid" : "", className]
        .filter(Boolean)
        .join(" ");
    return (
        <div className={cls}>
            {label ? (
                <label className="ds-field__label" htmlFor={autoId}>
                    {label}
                </label>
            ) : null}
            <Control
                id={autoId}
                className="ds-field__control"
                aria-invalid={invalid || undefined}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {...(props as any)}
            />
            {hint ? <span className="ds-field__hint">{hint}</span> : null}
        </div>
    );
}
