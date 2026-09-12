import { Link } from 'react-router-dom';

const AuthLayout = ({ title, subtitle, description, children }) => {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#2a75d3] to-[#0c3977] flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="w-full lg:w-1/2 text-white px-4 md:px-10 text-center lg:text-left mt-10 lg:mt-0">
                    <Link to="/" className="inline-block mb-12 opacity-60 hover:opacity-100 transition text-sm font-medium tracking-wide">
                        ← BACK TO HOME
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-black tracking-wider mb-4 uppercase">
                        {title}
                    </h1>
                    <h2 className="text-lg md:text-xl font-bold tracking-widest mb-6 uppercase text-blue-200">
                        {subtitle}
                    </h2>
                    <p className="text-sm md:text-sm text-blue-100/80 leading-relaxed max-w-md mx-auto lg:mx-0 font-light">
                        {description}
                    </p>
                </div>
                <div className="w-full max-w-md bg-white rounded-[30px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    {children}
                </div>
                
            </div>
        </div>
    );
};

export default AuthLayout;