const ContactUs = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
            <div className="relative max-w-lg w-full mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col scale-up">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-red-500 transition-colors z-20 shadow-sm border border-gray-200"
                >
                    ✕
                </button>
                <div className="w-full bg-gradient-to-b from-primary to-primary-hover text-white p-12 flex flex-col justify-center relative overflow-hidden text-center items-center">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
                    
                    <h3 className="text-3xl font-bold mb-6 z-10">Get In Touch </h3>
                    <p className="text-white/80 font-medium mb-10 z-10">
                        Have questions? We'd love to hear from you. Here are the ways you can reach our team.
                    </p>
                    <div className="space-y-6 z-10 font-medium text-lg text-left">
                        <p className="flex items-center gap-5"><span className="text-3xl">📍</span> Learnify Head Office, Colombo 03, Colombo</p>
                        <p className="flex items-center gap-5"><span className="text-3xl">📞</span> +94 77 123 4567</p>
                        <p className="flex items-center gap-5"><span className="text-3xl">📧</span> hello@learnify.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
