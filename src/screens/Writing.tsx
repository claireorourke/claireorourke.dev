import { Eyebrow } from "../chrome.js";

type PostTone = "peach" | "lavender" | "mint" | "sky";

interface Post {
    title: string;
    date: string;
    read: string;
    tone: PostTone;
    excerpt: string;
}

const POSTS: Post[] = [];

const TONE_VAR: Record<PostTone, string> = {
    peach: "var(--peach)",
    lavender: "var(--lavender)",
    mint: "var(--mint)",
    sky: "var(--sky)",
};

export function WritingScreen() {
    return (
        <div className="cl-writing">
            <header className="cl-section-head">
                <Eyebrow>writing</Eyebrow>
                <h2 className="cl-section-title">notes & thoughts</h2>
            </header>
            <ul className="cl-posts">
                {POSTS.map((p) => (
                    <li key={p.title}>
                        <a className="cl-post" href="#">
                            <span className="cl-post__swatch" style={{ background: TONE_VAR[p.tone] }} />
                            <span className="cl-post__main">
                                <span className="cl-post__title">{p.title}</span>
                                <span className="cl-post__excerpt">{p.excerpt}</span>
                            </span>
                            <span className="cl-post__meta">
                                {p.date}<span className="cl-post__dot">·</span>{p.read}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
