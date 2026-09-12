const HeroText = () => {
    return (
        <div className="h-[35vh] relative z-20 flex flex-col justify-center items-center w-full max-w-4xl mx-auto px-4 text-center">
            <div className="bg-white text-gray-800 px-4 py-1.5 rounded-full text-[11px] font-bold mb-4 flex items-center gap-2 shadow-sm">
                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z"/>
                </svg>
                Learn from the Top Experts
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] mb-4 tracking-wide">
                Learn Anywhere, Anytime <br className="hidden md:block" />
                Empower Your Future
            </h1>

            <p className="text-white/90 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
                Join thousands of learners gaining new skills, advancing careers<br className="hidden md:block"/>
                and shaping a better tomorrow—one lesson at a time.
            </p>
        </div>
    );
};

export default HeroText;