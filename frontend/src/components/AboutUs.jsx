import { GraduationCap, Users, BookOpen, Globe2 } from 'lucide-react';

const AboutUs = ({ onClose }) => {
    return (
        <div className="modal-overlay animate-fade-in">
            <div className="modal-window items-center scale-up justify-center text-center">
                <button onClick={onClose} className="modal-close-btn">✕</button>
                
                <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-blue-100 rotate-3">
                    <GraduationCap className="w-10 h-10 text-primary" strokeWidth={2.5}/>
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    About Learnify
                </h2>
                
                <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium max-w-2xl">
                    We are a leading e-learning platform committed to delivering world-class education strictly accessible from anywhere. Our mission is to connect top-tier instructors with ambitious students across the globe.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
                        <Users className="w-8 h-8 text-primary mb-3" strokeWidth={2} />
                        <h4 className="text-slate-800 font-extrabold text-2xl mb-1">10K+</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Students</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
                        <BookOpen className="w-8 h-8 text-primary mb-3" strokeWidth={2} />
                        <h4 className="text-slate-800 font-extrabold text-2xl mb-1">500+</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Courses</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
                        <GraduationCap className="w-8 h-8 text-primary mb-3" strokeWidth={2} />
                        <h4 className="text-slate-800 font-extrabold text-2xl mb-1">50+</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Instructors</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
                        <Globe2 className="w-8 h-8 text-primary mb-3" strokeWidth={2} />
                        <h4 className="text-slate-800 font-extrabold text-2xl mb-1">120</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Countries</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
