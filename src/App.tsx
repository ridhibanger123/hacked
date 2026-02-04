import { SpiralDemo } from "@/components/ui/spiral-demo"
import { useState, useEffect } from 'react'
import {HeroSection} from "./components/Hero/Hero"

function App() {
    const [showIntro, setShowIntro] = useState(true)
    const [contentVisible, setContentVisible] = useState(false)
    
    const handleEnter = () => {
        setShowIntro(false)
    }
    
    useEffect(() => {
        if (!showIntro) {
            document.documentElement.style.overflow = ''
            document.body.style.overflow = ''
            document.body.style.position = ''
            document.body.style.width = ''
            document.body.style.height = ''
            
            const root = document.getElementById('root')
            if (root) {
                root.style.overflow = ''
                root.style.height = ''
            }
            
            const timer = setTimeout(() => {
                setContentVisible(true)
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [showIntro])
    
    if (showIntro) {
        return <SpiralDemo onEnter={handleEnter} />
    }
    
    return (
        <HeroSection/>
    )
}

export default App