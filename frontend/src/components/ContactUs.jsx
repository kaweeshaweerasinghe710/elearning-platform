const ContactUs = ({ onClose }) => {
    return (
        <div className="modal-overlay animate-fade-in">
            <div className="modal-window scale-up flex flex-col md:flex-row p-8 md:p-12 items-center">
                <button onClick={onClose} className="modal-close-btn">✕</button>

                <div className="md:w-1/2 w-full pr-0 md:pr-8 flex flex-col h-full justify-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100 rotate-3 text-3xl">
                        📞
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Get In Touch</h2>
                    <p className="text-slate-500 text-lg font-medium mb-10">
                        Have questions? We'd love to hear from you. Here are the ways you can reach our team.
                    </p>
                    
                    <div className="space-y-4 text-left text-slate-700 font-semibold text-base flex flex-col items-start w-full">
                        <div className="flex items-center gap-4 w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                            <span className="text-2xl grayscale">📍</span> 
                            <span>Learnify Head Office,<br/>Colombo 03</span>
                        </div>
                        <div className="flex items-center gap-4 w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                            <span className="text-2xl grayscale">📞</span> 
                            <span>+94 77 123 4567</span>
                        </div>
                        <div className="flex items-center gap-4 w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                            <span className="text-2xl grayscale">📧</span> 
                            <span>hello@learnify.com</span>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 w-full h-64 md:h-full relative rounded-3xl overflow-hidden border-4 border-slate-50 shadow-inner mt-8 md:mt-0">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63162589006!2d79.8562055!3d6.9270786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1700000000000" 
                        className="absolute inset-0 w-full h-full border-0"
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Learnify Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
