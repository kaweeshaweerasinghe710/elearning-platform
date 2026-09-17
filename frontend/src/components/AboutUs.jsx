const AboutUs = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300">
            <div className="relative w-full max-w-4xl h-[85vh] md:h-[600px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row items-center p-8 md:p-12 hover:shadow-primary/20 transition-all duration-300">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-red-500 transition-colors z-20"
                >
                    ✕
                </button>
                <div className="md:w-1/2 w-full pr-0 md:pr-8 flex flex-col h-full justify-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        About Learnify
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed font-medium">
                        We are a leading e-learning platform committed to delivering world-class education strictly accessible from anywhere. Our mission is to connect top-tier instructors with ambitious students across the globe.
                    </p>
                    
                    <div className="flex gap-4 mb-4 md:mb-0">
                        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex-1 text-center">
                            <h4 className="text-primary font-black text-3xl mb-1">10K+</h4>
                            <p className="text-xs font-bold text-gray-500 uppercase">Students</p>
                        </div>
                        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex-1 text-center">
                            <h4 className="text-primary font-black text-3xl mb-1">500+</h4>
                            <p className="text-xs font-bold text-gray-500 uppercase">Courses</p>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 w-full h-64 md:h-full relative rounded-3xl overflow-hidden border-4 border-gray-50 shadow-inner">
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

export default AboutUs;
