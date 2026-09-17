const Button = ({ 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    children, 
    ...props 
}) => {
    const baseStyle = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]";
    
    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
        icon: "p-2",
        none: ""
    };

    const variants = {
        primary: "bg-blue-500 text-white hover:bg-blue-600 shadow-sm focus:ring-blue-500/20",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm focus:ring-slate-200",
        outline: "bg-blue-50/50 text-blue-600 border border-blue-200 hover:bg-blue-100 focus:ring-blue-200",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm focus:ring-red-500/20",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-none shadow-none active:scale-100",
        icon: "text-slate-400 hover:text-red-500 hover:bg-red-50 flex-shrink-0 border-none shadow-none active:scale-100"
    };

    const finalClassName = `${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`;

    return (
        <button className={finalClassName.trim()} {...props}>
            {children}
        </button>
    );
};

export default Button;
