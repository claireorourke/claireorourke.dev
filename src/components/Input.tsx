import { useMemo } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./Input.module.css";

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
    const autoId = useMemo(() => id ?? `ds-input-${++_id}`, [id]);
    const Control = multiline ? "textarea" : "input";
    const cls = [styles.field, invalid ? styles.invalid : "", className]
        .filter(Boolean)
        .join(" ");
    return (
        <div className={cls}>
            {label ? (
                <label className={styles.label} htmlFor={autoId}>
                    {label}
                </label>
            ) : null}
            <Control
                id={autoId}
                className={styles.control}
                aria-invalid={invalid || undefined}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {...(props as any)}
            />
            {hint ? <span className={styles.hint}>{hint}</span> : null}
        </div>
    );
}
