const AboutUs = ({ onClose }) => {
    return (
        <div className="modal-overlay animate-fade-in">
            <div className="modal-window justify-center items-center text-center scale-up">
                <button onClick={onClose} className="modal-close-btn">✕</button>
                
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    About Learnify
                </h2>
                <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium max-w-2xl">
                    We are a leading e-learning platform committed to delivering world-class education strictly accessible from anywhere. Our mission is to connect top-tier instructors with ambitious students across the globe.
                </p>
                
                <div className="flex gap-6 max-w-md w-full">
                    <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex-1 hover:shadow-md transition-shadow">
                        <h4 className="text-primary font-black text-4xl mb-2">10K+</h4>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Students</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex-1 hover:shadow-md transition-shadow">
                        <h4 className="text-primary font-black text-4xl mb-2">500+</h4>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Courses</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
