// src/App.tsx
import { SpiralDemo } from "@/components/ui/spiral-demo";
import { useState, useEffect } from 'react';
import { HeroSection } from "@/components/Hero/Hero";
import Teams from "@/components/Team/Team";
import Gallery from "@/components/Gallery/GalleryDemo";
import Footer from "./components/Footer/Footer";
import Sponsor from "./components/Sponsor/Sposnor";
import Prizes from "./components/Prizes/Prizes";

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
            <HeroSection />
            <Teams />
            <Sponsor />
            <Prizes />
            <Gallery />
            
            <Footer />
        </main>
    );
}

export default App;