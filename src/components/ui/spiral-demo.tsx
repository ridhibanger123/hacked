import { SpiralAnimation } from "./spiral-animation"
import { useState, useEffect } from 'react'

interface SpiralDemoProps {
    onEnter: () => void
}

const SpiralDemo = ({ onEnter }: SpiralDemoProps) => {
    const [isExiting, setIsExiting] = useState(false)

    // Lock scroll while intro is active
    useEffect(() => {
        // Lock scrolling
        document.documentElement.style.overflow = 'hidden'
        document.body.style.overflow = 'hidden'
        document.body.style.height = '100%'
        document.documentElement.style.height = '100%'

        return () => {
            // Unlock scrolling when component unmounts
            document.documentElement.style.overflow = ''
            document.body.style.overflow = ''
            document.body.style.height = ''
            document.documentElement.style.height = ''
        }
    }, [])

    const handleAnimationComplete = () => {
        // Auto-proceed after animation completes (no button needed)
        handleEnter()
    }

    const handleEnter = () => {
        setIsExiting(true)

        // Unlock scroll before transitioning
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
        document.body.style.height = ''
        document.documentElement.style.height = ''

        setTimeout(() => {
            onEnter()
        }, 800)
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                margin: 0,
                padding: 0,
                overflow: 'hidden',
                backgroundColor: '#000',
                opacity: isExiting ? 0 : 1,
                transition: 'opacity 0.7s ease-out',
                zIndex: 9999
            }}
        >
            {/* Spiral Animation */}
            <SpiralAnimation onAnimationComplete={handleAnimationComplete} />
        </div>
    )
}

export { SpiralDemo }