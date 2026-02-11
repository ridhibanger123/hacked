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

const scheduleData: ScheduleItem[] = [
    {
        id: 1,
        time: '09:00 AM',
        title: 'Opening Ceremony',
        description: 'Kickoff the hackathon with keynote speakers and announcements.',
        location: 'Main Hall',
    },
    {
        id: 2,
        time: '10:00 AM',
        title: 'Hacking Begins',
        description: 'Start working on your projects! Mentors are available for help.',
        location: 'Hack Zone',
    },
    {
        id: 3,
        time: '01:00 PM',
        title: 'Lunch Break',
        description: 'Refuel with delicious food and network with other hackers.',
        location: 'Cafeteria',
    },
    {
        id: 4,
        time: '03:00 PM',
        title: 'Workshop: AI Trends',
        description: 'Learn about the latest trends in Artificial Intelligence.',
        location: 'Auditorium B',
    },
    {
        id: 5,
        time: '06:00 PM',
        title: 'Dinner & Games',
        description: 'Relax and have fun with some games and dinner.',
        location: 'Lounge Area',
    },
    {
        id: 6,
        time: '09:00 PM',
        title: 'Midnight Coding Challenge',
        description: 'A fun mini-competition for night owls.',
        location: 'Hack Zone',
    },
    {
        id: 7,
        time: '12:00 AM',
        title: 'Midnight Snacks',
        description: 'Late night fuel to keep you going.',
        location: 'Cafeteria',
    },
    {
        id: 8,
        time: '08:00 AM',
        title: 'Project Submission',
        description: 'Submit your projects for judging.',
        location: 'Online Portal',
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
                <h2 className="schedule-title">Event <span className="highlight">Schedule</span></h2>
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
