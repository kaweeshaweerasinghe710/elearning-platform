import { useState } from 'react';
import LandingHeader from '../components/LandingHeader';
import HeroText from '../components/HeroText';
import HeroIllustration from '../components/HeroIllustration';
import AboutUs from '../components/AboutUs';
import ContactUs from '../components/ContactUs';
import InstructorsModal from '../components/InstructorsModal';

const Landing = () => {
    const [activeModal, setActiveModal] = useState(null); 

    return (
        <div className="h-screen w-full bg-gradient-to-br from-blue-400 via-blue-400 to-blue-500 relative overflow-hidden font-sans flex flex-col">
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
                onOpenInstructors={() => setActiveModal('instructors')}
            />
            
            <div className="flex-1 flex flex-col items-center px-6 md:px-12 max-w-7xl mx-auto w-full pt-8 md:pt-12">
                <HeroText />
                <HeroIllustration />
            </div>
            {activeModal === 'about' && <AboutUs onClose={() => setActiveModal(null)} />}
            {activeModal === 'contact' && <ContactUs onClose={() => setActiveModal(null)} />}
            {activeModal === 'instructors' && <InstructorsModal onClose={() => setActiveModal(null)} />}
            
        </div>
    );
};

export default Landing;