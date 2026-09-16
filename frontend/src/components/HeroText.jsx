const HeroText = () => {
    return (
        <div className="h-[35vh] relative z-20 flex flex-col justify-center items-center w-full max-w-4xl mx-auto px-4 text-center">

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