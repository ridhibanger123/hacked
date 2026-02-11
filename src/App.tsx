// src/App.tsx
import { SpiralDemo } from "@/components/ui/spiral-demo";
import { useState, useEffect } from 'react';
import { HeroSection } from "@/components/Hero/Hero";
import Teams from "@/components/Team/Team";
import Gallery from "@/components/Gallery/GalleryDemo";
import Footer from "./components/Footer/Footer";
import Sponsor from "./components/Sponsor/Sposnor";
import Prizes from "./components/Prizes/Prizes";
import Navbar from "./components/Navbar/Navbar";
import Schedule from "./components/Schedule/Schedule";
import UnstopButton from "./components/ui/UnstopButton";

function App() {
    const [showIntro, setShowIntro] = useState(true);

    const handleEnter = () => {
        setShowIntro(false);
    };

    useEffect(() => {
        if (!showIntro) {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';

            const root = document.getElementById('root');
            if (root) {
                root.style.overflow = '';
                root.style.height = '';
            }
        }
    }, [showIntro]);

    if (showIntro) {
        return <SpiralDemo onEnter={handleEnter} />;
    }

    return (
        <main>
            <UnstopButton />
            <Navbar logo={"./images/logo.png"} items={[
                { label: "Home", href: "#home" },
                { label: "Schedule", href: "#schedule" },
                { label: "Teams", href: "#teams" },
                { label: "Sponsors", href: "#sponsors" },
                { label: "Prizes", href: "#prizes" },
                { label: "Gallery", href: "#gallery" },

            ]} />
            <HeroSection />
            <Schedule />
            <Teams />
            <Sponsor />
            <Prizes />
            <Gallery />

            <Footer />
        </main>
    );
}

export default App;