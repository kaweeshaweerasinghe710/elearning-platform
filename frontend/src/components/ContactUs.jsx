const ContactUs = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
            <div className="relative w-full max-w-4xl h-[85vh] md:h-[600px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col justify-center items-center p-8 md:p-12 scale-up">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-red-500 transition-colors z-20"
                >
                    ✕
                </button>

                <div className="w-full h-full flex flex-col justify-center items-center text-center">
                    <div className="aspect-square w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-blue-100 rotate-3">
                        <span className="text-5xl">📞</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Get In Touch</h2>
                    <p className="text-gray-500 text-lg font-medium mb-10 max-w-md">
                        Have questions? We'd love to hear from you. Here are the ways you can reach our team.
                    </p>
                    
                    <div className="space-y-6 text-left text-gray-700 font-semibold text-lg flex flex-col items-start w-full max-w-sm">
                        <div className="flex items-center gap-6 w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                            <span className="text-3xl grayscale">📍</span> 
                            <span>Learnify Head Office,<br/>Colombo 03</span>
                        </div>
                        <div className="flex items-center gap-6 w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                            <span className="text-3xl grayscale">📞</span> 
                            <span>+94 77 123 4567</span>
                        </div>
                        <div className="flex items-center gap-6 w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                            <span className="text-3xl grayscale">📧</span> 
                            <span>hello@learnify.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
