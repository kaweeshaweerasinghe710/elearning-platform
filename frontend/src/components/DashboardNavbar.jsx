import { useState, useRef, useEffect } from 'react';
import { Layout, BookOpen, PlusCircle, Settings } from 'lucide-react';

const DashboardNavbar = ({ user, logout, activeTab, setActiveTab }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const renderTabs = () => (
        <>
            {user.role === 'student' ? (
                <>
                    <NavLink active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} icon={<Layout size={18} />}>Explore Courses</NavLink>
                    <NavLink active={activeTab === 'enrollments'} onClick={() => setActiveTab('enrollments')} icon={<BookOpen size={18} />}>My Enrollments</NavLink>
                </>
            ) : (
                <>
                    <NavLink active={activeTab === 'manage'} onClick={() => setActiveTab('manage')} icon={<Layout size={18} />}>Dashboard</NavLink>
                    <NavLink active={activeTab === 'create'} onClick={() => setActiveTab('create')} icon={<PlusCircle size={18} />}>Create</NavLink>
                </>
            )}
        </>
    );

    return (
        <div className="nav-wrapper pb-2 md:pb-0">
            <nav className="nav-bar">
                
                <div className="flex items-center gap-3">
                    <div className="nav-logo-box">L</div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 leading-tight">Learnify</span>
                        <span className="text-[10px] text-slate-500 font-medium">E-Learning Platform</span>
                    </div>
                </div>
                
                <div className="hidden md:flex items-center gap-1">
                    {renderTabs()}
                </div>

                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-full transition-colors focus:outline-none cursor-pointer"
                    >
                        <div className="hidden sm:flex flex-col items-end mr-1 text-right">
                            <span className="text-sm font-bold text-slate-800 leading-tight">{user.name}</span>
                            <span className="text-xs font-medium text-slate-500 capitalize">{user.role}</span>
                        </div>
                        <div className="nav-avatar">
                            {user.name.charAt(0)}
                        </div>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <button
                                onClick={() => {
                                    setActiveTab('settings');
                                    setIsDropdownOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-3 font-medium cursor-pointer"
                            >
                                <span className="opacity-70"><Settings size={18} /></span> Settings
                            </button>
                            <div className="h-px bg-slate-100 my-1"></div>
                            <button
                                onClick={() => {
                                    logout();
                                    setIsDropdownOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </nav>
            
            <div className="flex md:hidden items-center gap-1 w-full overflow-x-auto justify-center px-4 scrollbar-hide">
                {renderTabs()}
            </div>
        </div>
    );
};

const NavLink = ({ active, onClick, icon, children }) => (
    <button
        onClick={onClick}
        className={`nav-link-base ${active ? 'nav-link-active' : 'nav-link-inactive'}`}
    >
        <span className="opacity-80">{icon}</span>
        {children}
    </button>
);

export default DashboardNavbar;
