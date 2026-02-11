import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './schedule.css';

gsap.registerPlugin(ScrollTrigger);

interface ScheduleItem {
    id: number;
    time: string;
    title: string;
    description: string;
    location: string;
}

// Reduced to 6 main event cards taken from the Flow of Events timeline
const scheduleData: ScheduleItem[] = [
    {
        id: 1,
        time: '09:00 AM - 11:00 AM (13 Mar)',
        title: 'Check-In',
        description: 'Participant registration and check-in at the reception.',
        location: 'Reception',
    },
    {
        id: 2,
        time: '10:00 AM - 11:00 AM (13 Mar)',
        title: 'Inaugural Session',
        description: 'Opening ceremony and keynote addresses.',
        location: 'Auditorium',
    },
    {
        id: 3,
        time: '11:00 AM - 05:00 PM (13 Mar)',
        title: 'Hacking Sessions',
        description: 'Hacking starts and continues through the day with mentor support and breaks.',
        location: 'North Block Building',
    },
    {
        id: 4,
        time: '05:00 PM - 07:00 PM (13 Mar)',
        title: 'Mentoring Session',
        description: 'Mentors available for focused guidance and troubleshooting.',
        location: 'North Block Building',
    },
    {
        id: 5,
        time: '02:30 AM - 08:00 AM (14 Mar)',
        title: 'Final Hacking',
        description: 'Final push to complete projects before submission.',
        location: 'North Block Building',
    },
    {
        id: 6,
        time: '11:00 AM - 05:00 PM (14 Mar)',
        title: 'Judging & Closing',
        description: 'Judging rounds followed by the closing ceremony and prize distribution.',
        location: 'North Block Building / Auditorium',
    }
];

const Schedule: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            const cards = cardsRef.current;
            const cardWidth = 320;
            const gap = 32; // 2rem
            const totalScroll = cards.length * (cardWidth + gap);

            // Set initial state
            gsap.set(cards, {
                y: 100,
                opacity: 0
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: `+=${totalScroll}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            // 1. First card enters alone
            if (cards.length > 0) {
                tl.to(cards[0], {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                });
            }

            // 2. Loop for subsequent cards: Scroll container AND bring in next card simultaneously
            for (let i = 1; i < cards.length; i++) {
                const scrollAmount = -(i * (cardWidth + gap)); // Scroll to show this card

                // Add label for synchronization
                tl.addLabel(`card-${i}`);

                // Move container to the left to "make room" / show the next slot
                tl.to(containerRef.current, {
                    x: scrollAmount,
                    duration: 1,
                    ease: 'power1.inOut'
                }, `card-${i}`);

                // Animate the next card up WHILE the container is scrolling
                tl.to(cards[i], {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                }, `card-${i}+=0.1`); // Start shorty after the scroll begins
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="schedule-section" id="schedule">
            <div className="schedule-header">
                <h2 className="schedule-title">Event Schedule</h2>
                {/* Anchor that downloads the schedule PDF placed in public/pdf */}
                <a
                    className="schedule-download-button"
                    href="/pdf/Flow%20of%20Events%20-%20Hacked%204.0%20.pdf"
                    download="Flow of Events - Hacked 4.0.pdf"
                    aria-label="Download Event Schedule"
                    rel="noopener noreferrer"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Event Schedule
                </a>
            </div>

            <div className="schedule-container" ref={containerRef}>
                {scheduleData.map((item) => (
                    <div key={item.id} className="schedule-card" ref={addToRefs}>
                        <div className="card-top">
                            <span className="card-time">{item.time}</span>
                            <span className="card-location">{item.location}</span>
                        </div>
                        <h3 className="card-title">{item.title}</h3>
                        <p className="card-description">{item.description}</p>
                        <div className="card-glow"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Schedule;
