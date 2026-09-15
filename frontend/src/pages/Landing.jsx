import { useState } from 'react';
import LandingHeader from '../components/LandingHeader';
import HeroText from '../components/HeroText';
import HeroIllustration from '../components/HeroIllustration';
import AboutUs from '../components/AboutUs';
import ContactUs from '../components/ContactUs';

const Landing = () => {
    const [activeModal, setActiveModal] = useState(null); 

    return (
        <div className="h-screen w-full bg-gradient-to-br from-accent via-accent-hover to-primary relative overflow-hidden font-sans flex flex-col">
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                .animate-float { animation: float 4s ease-in-out infinite; } 
                .float-delay-1 { animation-delay: 1s; }
                .float-delay-2 { animation-delay: 2s; }
            `}</style>

            <LandingHeader 
                onOpenAbout={() => setActiveModal('about')} 
                onOpenContact={() => setActiveModal('contact')} 
            />
            
            <div className="flex-1 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 max-w-7xl mx-auto w-full">
                <HeroText />
                <HeroIllustration />
            </div>
            {activeModal === 'about' && <AboutUs onClose={() => setActiveModal(null)} />}
            {activeModal === 'contact' && <ContactUs onClose={() => setActiveModal(null)} />}
            
        </div>
    );
};

export default Landing;