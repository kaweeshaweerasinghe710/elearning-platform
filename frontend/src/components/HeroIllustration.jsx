const HeroIllustration = () => {
    return (
        <div className="h-[55vh] relative w-full max-w-5xl mx-auto flex justify-center items-end">

            <div className="absolute bottom-[-10%] w-[40vh] h-[40vh] rounded-full border-[15px] border-white/5 pointer-events-none z-0"></div>
            <div className="absolute bottom-[-20%] w-[65vh] h-[65vh] rounded-full border-[20px] border-white/5 pointer-events-none z-0"></div>
            <div className="absolute bottom-[-30%] w-[90vh] h-[90vh] rounded-full border-[20px] border-white/5 pointer-events-none z-0"></div>
            <img 
                src="/student.png" 
                alt="Student" 
                className="relative z-10 h-full w-auto object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)]"
            />
            <div className="absolute left-2 lg:left-10 bottom-[15%] md:bottom-[20%] bg-white p-4 md:p-5 rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] w-[160px] md:w-[200px] text-left z-20 animate-float float-delay-1 hover:scale-110 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-all duration-500 cursor-default">
                <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">4.8</h3>
                <div className="flex text-yellow-400 text-xs md:text-sm mb-2 md:mb-3">
                    ⭐⭐⭐⭐⭐
                </div>
                <p className="text-[10px] md:text-[11px] text-gray-600 font-medium leading-relaxed">
                    By students worldwide for<br/>quality learning and support.
                </p>
            </div>
            
            <div className="absolute right-2 lg:right-10 bottom-[25%] md:bottom-[35%] bg-white p-4 md:p-5 rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] w-[170px] md:w-[220px] text-left z-20 animate-float float-delay-2 hover:scale-110 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-all duration-500 cursor-default">
                <div className="flex -space-x-3 mb-3 md:mb-4">
                    <img src="https://i.pravatar.cc/100?img=1" className="w-7 h-7 md:w-10 md:h-10 rounded-full border-2 border-white object-cover shadow-sm"/>
                    <img src="https://i.pravatar.cc/100?img=2" className="w-7 h-7 md:w-10 md:h-10 rounded-full border-2 border-white object-cover shadow-sm"/>
                    <img src="https://i.pravatar.cc/100?img=3" className="w-7 h-7 md:w-10 md:h-10 rounded-full border-2 border-white object-cover shadow-sm"/>
                    <img src="https://i.pravatar.cc/100?img=4" className="w-7 h-7 md:w-10 md:h-10 rounded-full border-2 border-white object-cover shadow-sm"/>
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-1">60k+</h3>
                <p className="text-[10px] md:text-[11px] text-gray-600 font-medium leading-relaxed">
                    Learners growing with expert<br/>guidance from trusted mentors.
                </p>
            </div>
        </div>
    );
};

export default HeroIllustration;