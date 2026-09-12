import LandingHeader from '../components/LandingHeader';
import HeroText from '../components/HeroText';
import HeroIllustration from '../components/HeroIllustration';

const Landing = () => {
    return (
        <div className="h-screen w-full bg-gradient-to-br from-[#4ea1ff] via-[#2d7ae5] to-[#1256ae] relative overflow-hidden font-sans flex flex-col">
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                .animate-float { animation: float 4s ease-in-out infinite; } 
                .float-delay-1 { animation-delay: 1s; }
                .float-delay-2 { animation-delay: 2s; }
            `}</style>

            <LandingHeader />
            <HeroText />
            <HeroIllustration />
            
        </div>
    );
};

export default Landing;