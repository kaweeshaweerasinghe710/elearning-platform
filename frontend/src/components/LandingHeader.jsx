import { Link } from 'react-router-dom';

const LandingHeader = () => {
    return (
        <nav className="h-[10vh] w-full max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-12 relative z-50">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
                <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"/>
                </svg>
                Learnify
            </div>
            
            <div className="hidden lg:flex gap-7 text-white/90 text-xs font-medium tracking-wide">
                <span className="cursor-pointer hover:text-white transition">Instructors</span>
                <span className="cursor-pointer hover:text-white transition">About Us</span>
                <span className="cursor-pointer hover:text-white transition">Contact</span>
            </div>
            
            <Link to="/register" className="bg-white text-[#1256ae] px-4 py-1.5 rounded-full font-bold shadow-md flex items-center gap-3 text-xs hover:scale-105 transition-transform">
                Start here
                <div className="w-6 h-6 bg-[#4ea1ff] rounded-full flex items-center justify-center text-white text-[10px]">✕</div>
            </Link>
        </nav>
    );
};

export default LandingHeader;