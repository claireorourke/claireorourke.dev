export interface NavId {
    id: string;
    label: string;
}

export const NAV: NavId[] = [
    { id: "home", label: "home" },
    { id: "work", label: "work" },
    { id: "writing", label: "writing" },
];

export interface EyebrowProps {
    children: React.ReactNode;
}

export function Eyebrow({ children }: EyebrowProps) {
    return <span className="cl-eyebrow">{children}</span>;
}

export interface WordmarkProps {
    onClick: () => void;
}

export function Wordmark({ onClick }: WordmarkProps) {
    return (
        <button className="cl-wordmark" onClick={onClick} aria-label="claire — home">
            claire
        </button>
    );
}

export interface SiteNavProps {
    active: string;
    onNav: (id: string) => void;
}

export function SiteNav({ active, onNav }: SiteNavProps) {
    return (
        <header className="cl-nav">
            <Wordmark onClick={() => onNav("home")} />
            <nav className="cl-nav__links">
                {NAV.map((n) => (
                    <button
                        key={n.id}
                        className={"cl-nav__link" + (active === n.id ? " is-active" : "")}
                        onClick={() => onNav(n.id)}
                    >
                        {n.label}
                    </button>
                ))}
            </nav>
        </header>
    );
}

export function SiteFooter() {
    return (
        <footer className="cl-footer">
            <p className="cl-footer__copy">© {new Date().getFullYear()} claire o'rourke</p>
            <a
                className="cl-footer__gh"
                href="https://github.com/claireorourke"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
            >
                <svg className="cl-footer__gh-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
            </a>
        </footer>
    );
}
