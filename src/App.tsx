import { useState } from "react";
import { SiteNav, SiteFooter } from "./chrome.js";
import { HomeScreen } from "./screens/Home.js";
import { WorkScreen } from "./screens/Work.js";
import { WritingScreen } from "./screens/Writing.js";

type NavId = "home" | "work" | "writing";

export function App() {
    const [active, setActive] = useState<NavId>("home");

    const onNav = (id: string) => {
        setActive(id as NavId);
        window.scrollTo({ top: 0 });
    };

    return (
        <div className="cl-app">
            <SiteNav active={active} onNav={onNav} />
            <div className="cl-shell">
                {active === "home" && <HomeScreen />}
                {active === "work" && <WorkScreen />}
                {active === "writing" && <WritingScreen />}
            </div>
            <SiteFooter />
        </div>
    );
}
