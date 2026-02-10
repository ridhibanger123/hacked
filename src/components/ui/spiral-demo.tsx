import { SpiralAnimation } from "./spiral-animation"
import { useState, useEffect } from 'react'

interface SpiralDemoProps {
    onEnter: () => void
}

const SpiralDemo = ({ onEnter }: SpiralDemoProps) => {
    const [showButton, setShowButton] = useState(false)
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
        setShowButton(true)
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
            
            {/* Enter Button */}
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100,
                    opacity: showButton ? 1 : 0,
                    visibility: showButton ? 'visible' : 'hidden',
                    transition: 'opacity 1s ease-out',
                    pointerEvents: showButton ? 'auto' : 'none'
                }}
            >
                <button 
                    onClick={handleEnter}
                    className="glitch-button"
                    style={{
                        position: 'relative',
                        padding: '24px 64px',
                        fontSize: '24px',
                        fontWeight: 200,
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        outline: 'none',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.5s ease-out',
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 0 40px rgba(255, 255, 255, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                        const btn = e.currentTarget
                        btn.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
                        btn.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                        btn.style.transform = 'scale(1.05)'
                        btn.style.letterSpacing = '0.4em'
                        btn.style.boxShadow = '0 0 60px rgba(255, 255, 255, 0.15)'
                    }}
                    onMouseLeave={(e) => {
                        const btn = e.currentTarget
                        btn.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'
                        btn.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                        btn.style.transform = 'scale(1)'
                        btn.style.letterSpacing = '0.3em'
                        btn.style.boxShadow = '0 0 40px rgba(255, 255, 255, 0.05)'
                    }}
                >
                    {/* Orbiting dots */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '200px',
                        height: '200px',
                        marginLeft: '-100px',
                        marginTop: '-100px',
                        pointerEvents: 'none'
                    }}>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    width: '4px',
                                    height: '4px',
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    top: '50%',
                                    left: '50%',
                                    opacity: 0.3 + (i % 3) * 0.15,
                                    animation: `orbit ${10 + i * 2}s linear infinite`,
                                    transform: `rotate(${i * 60}deg) translateX(100px)`
                                }}
                            />
                        ))}
                    </div>
                    
                    {/* Glow effect */}
                    <div style={{
                        position: 'absolute',
                        inset: '-20px',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                        borderRadius: '70px',
                        opacity: 0.5,
                        animation: 'pulse 3s ease-in-out infinite',
                        pointerEvents: 'none'
                    }} />
                    
                    {/* Glitch Text Container */}
                    <span className="glitch-wrapper" style={{ position: 'relative', zIndex: 10, display: 'inline-block' }}>
                        <span className="glitch-text" data-text="Hacked 4.0">
                            Hacked 4.0
                        </span>
                    </span>
                </button>
            </div>
            
            {/* CSS Animations */}
            <style>{`
                @keyframes orbit {
                    from {
                        transform: rotate(0deg) translateX(100px) rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg) translateX(100px) rotate(-360deg);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.3;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.6;
                        transform: scale(1.05);
                    }
                }

                .glitch-wrapper {
                    position: relative;
                }

                .glitch-text {
                    position: relative;
                    display: inline-block;
                    animation: glitch-skew 4s infinite linear alternate-reverse;
                }

                .glitch-text::before,
                .glitch-text::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .glitch-text::before {
                    left: 2px;
                    text-shadow: -2px 0 #ff00ff;
                    clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
                    animation: glitch-anim-1 3s infinite linear alternate-reverse;
                }

                .glitch-text::after {
                    left: -2px;
                    text-shadow: 2px 0 #00ffff;
                    clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
                    animation: glitch-anim-2 2s infinite linear alternate-reverse;
                }

                @keyframes glitch-anim-1 {
                    0%, 100% {
                        clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
                        transform: translate(0);
                    }
                    10% {
                        clip-path: polygon(0 15%, 100% 15%, 100% 30%, 0 30%);
                        transform: translate(-3px, -1px);
                    }
                    20% {
                        clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
                        transform: translate(3px, 1px);
                    }
                    30% {
                        clip-path: polygon(0 25%, 100% 25%, 100% 45%, 0 45%);
                        transform: translate(-2px, 0);
                    }
                    40% {
                        clip-path: polygon(0 40%, 100% 40%, 100% 55%, 0 55%);
                        transform: translate(2px, -1px);
                    }
                    50% {
                        clip-path: polygon(0 5%, 100% 5%, 100% 15%, 0 15%);
                        transform: translate(-1px, 2px);
                    }
                    60% {
                        clip-path: polygon(0 50%, 100% 50%, 100% 70%, 0 70%);
                        transform: translate(1px, 0);
                    }
                    70% {
                        clip-path: polygon(0 30%, 100% 30%, 100% 40%, 0 40%);
                        transform: translate(-2px, -2px);
                    }
                    80% {
                        clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
                        transform: translate(3px, 1px);
                    }
                    90% {
                        clip-path: polygon(0 20%, 100% 20%, 100% 35%, 0 35%);
                        transform: translate(-1px, -1px);
                    }
                }

                @keyframes glitch-anim-2 {
                    0%, 100% {
                        clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
                        transform: translate(0);
                    }
                    10% {
                        clip-path: polygon(0 70%, 100% 70%, 100% 85%, 0 85%);
                        transform: translate(2px, 1px);
                    }
                    20% {
                        clip-path: polygon(0 80%, 100% 80%, 100% 95%, 0 95%);
                        transform: translate(-2px, -1px);
                    }
                    30% {
                        clip-path: polygon(0 55%, 100% 55%, 100% 70%, 0 70%);
                        transform: translate(1px, 2px);
                    }
                    40% {
                        clip-path: polygon(0 90%, 100% 90%, 100% 100%, 0 100%);
                        transform: translate(-1px, 0);
                    }
                    50% {
                        clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%);
                        transform: translate(2px, -1px);
                    }
                    60% {
                        clip-path: polygon(0 75%, 100% 75%, 100% 90%, 0 90%);
                        transform: translate(-3px, 1px);
                    }
                    70% {
                        clip-path: polygon(0 65%, 100% 65%, 100% 80%, 0 80%);
                        transform: translate(1px, -2px);
                    }
                    80% {
                        clip-path: polygon(0 85%, 100% 85%, 100% 100%, 0 100%);
                        transform: translate(-2px, 2px);
                    }
                    90% {
                        clip-path: polygon(0 70%, 100% 70%, 100% 85%, 0 85%);
                        transform: translate(2px, 0);
                    }
                }

                @keyframes glitch-skew {
                    0%, 100% {
                        transform: skew(0deg);
                    }
                    10% {
                        transform: skew(-0.5deg);
                    }
                    20% {
                        transform: skew(0.5deg);
                    }
                    30% {
                        transform: skew(0deg);
                    }
                    40% {
                        transform: skew(-0.3deg);
                    }
                    50% {
                        transform: skew(0.3deg);
                    }
                    60% {
                        transform: skew(0deg);
                    }
                    70% {
                        transform: skew(0.2deg);
                    }
                    80% {
                        transform: skew(-0.2deg);
                    }
                    90% {
                        transform: skew(0deg);
                    }
                }

                .glitch-button:hover .glitch-text::before {
                    animation: glitch-anim-1 0.5s infinite linear alternate-reverse;
                }

                .glitch-button:hover .glitch-text::after {
                    animation: glitch-anim-2 0.3s infinite linear alternate-reverse;
                }

                .glitch-button:hover .glitch-text {
                    animation: glitch-skew 0.5s infinite linear alternate-reverse;
                }
            `}</style>
        </div>
    )
}

export { SpiralDemo }