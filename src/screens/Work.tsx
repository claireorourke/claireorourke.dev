import { Card, Tag } from "../components/index.js";
import { Eyebrow } from "../chrome.js";
import type { CardTone } from "../components/index.js";

interface Project {
    name: string;
    repo: string;
    tone: CardTone;
    blurb: string;
    tags: string[];
    year: string;
    url?: string;
}

const PROJECTS: Project[] = [
    {
        name: "claireorourke.dev",
        repo: "claireorourke.dev",
        tone: "sky",
        blurb: "This site.",
        tags: [],
        year: "2026",
        url: "https://claireorourke.dev",
    },
    {
        name: "iou",
        repo: "iou",
        tone: "mint",
        blurb: "Split tabs with friends.",
        tags: [],
        year: "2025",
        url: "https://claireorourke.github.io/iou/",
    },
];

export function WorkScreen() {
    return (
        <div className="cl-work">
            <header className="cl-section-head">
                <Eyebrow>work</Eyebrow>
                <h2 className="cl-section-title">things i've made</h2>
            </header>
            <div className="cl-work__grid">
                {PROJECTS.map((p) => (
                    <Card key={p.repo} variant="soft" tone={p.tone} interactive className="cl-proj">
                        {p.url && (
                            <a className="cl-proj__cover" href={p.url} target="_blank" rel="noreferrer" aria-label={p.name} />
                        )}
                        <div className="cl-proj__top">
                            <span className="cl-proj__year">{p.year}</span>
                        </div>
                        <h3 className="cl-proj__name">{p.name}</h3>
                        <p className="cl-proj__blurb">{p.blurb}</p>
                        <div className="cl-proj__tags">
                            {p.tags.map((t) => (
                                <Tag key={t} tone="outline">{t}</Tag>
                            ))}
                        </div>
                        <div className="cl-proj__links">
                            <a
                                className="cl-proj__link"
                                href={`https://github.com/claireorourke/${p.repo}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                github ↗
                            </a>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
