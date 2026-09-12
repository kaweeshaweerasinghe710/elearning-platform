const AboutUs = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
            <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-16 p-8 md:p-16 scale-up">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-red-500 transition-colors z-10"
                >
                    ✕
                </button>
                <div className="md:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Empowering Learners Worldwide 🌍
                    </h2>
                    <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
                        At Learnify, we believe that education should be accessible, engaging, and premium. Our platform connects passionate instructors with eager students, providing world-class tools to build and consume educational content.
                    </p>
                    
                    <div className="flex gap-6">
                        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex-1 text-center shadow-sm hover:-translate-y-2 transition-transform duration-300">
                            <h4 className="text-[#1256ae] font-black text-4xl mb-2">10K+</h4>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Students</p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex-1 text-center shadow-sm hover:-translate-y-2 transition-transform duration-300">
                            <h4 className="text-[#1256ae] font-black text-4xl mb-2">500+</h4>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Instructors</p>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 w-full relative">
                    <div className="aspect-square max-w-sm mx-auto bg-gradient-to-tr from-blue-100 to-[#1256ae]/20 rounded-[4rem] p-8 flex items-center justify-center rotate-3 hover:rotate-0 transition-all duration-500 shadow-xl">
                        <span className="text-[140px] drop-shadow-2xl animate-float">🎓</span>
                    </div>
                </div>

            </div>
            
            <style>{`
                @keyframes scaleUp {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .scale-up { animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
};

export default AboutUs;
