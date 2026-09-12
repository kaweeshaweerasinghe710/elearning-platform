const ContactUs = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
            <div className="relative max-w-5xl w-full mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row scale-up">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-red-500 transition-colors z-20 shadow-sm border border-gray-200"
                >
                    ✕
                </button>
                <div className="md:w-2/5 bg-gradient-to-b from-[#1256ae] to-[#0c3977] text-white p-12 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
                    
                    <h3 className="text-3xl font-bold mb-6 z-10">Get In Touch ✉️</h3>
                    <p className="text-white/80 font-medium mb-10 z-10">
                        Have questions? We'd love to hear from you. Send us a message and our team will respond as soon as possible.
                    </p>
                    <div className="space-y-6 z-10 font-medium text-lg">
                        <p className="flex items-center gap-5"><span className="text-3xl">📍</span> Learnify HQ, Colombo</p>
                        <p className="flex items-center gap-5"><span className="text-3xl">📞</span> +94 77 123 4567</p>
                        <p className="flex items-center gap-5"><span className="text-3xl">📧</span> hello@learnify.com</p>
                    </div>
                </div>
                <div className="md:w-3/5 p-12 bg-white">
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); onClose(); }}>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Your Name</label>
                            <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1256ae] outline-none font-medium text-sm transition-all" placeholder="John Doe" required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Email Address</label>
                            <input type="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1256ae] outline-none font-medium text-sm transition-all" placeholder="john@example.com" required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Message</label>
                            <textarea rows="4" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1256ae] outline-none resize-none font-medium text-sm transition-all" placeholder="How can we help you today?" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-[#1256ae] text-white font-black text-lg py-4 rounded-2xl hover:bg-[#0c3977] shadow-[0_10px_20px_rgba(18,86,174,0.3)] hover:shadow-[0_15px_30px_rgba(18,86,174,0.4)] hover:-translate-y-1 transition-all duration-300">
                            Send Message
                        </button>
                    </form>
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

export default ContactUs;
