import { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import DashboardNavbar from '../components/DashboardNavbar';
import CourseList from '../components/CourseList';
import CreateCourse from '../components/CreateCourse';
import MyEnrollments from '../components/MyEnrollments';
import InstructorCourses from '../components/InstructorCourses';
import ChangePassword from '../components/ChangePassword';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    
    const [activeTab, setActiveTab] = useState(() => {
        const savedTab = sessionStorage.getItem('dashboard_active_tab');
        const role = user?.role;
        
        if (savedTab) {
            if (role === 'student' && ['courses', 'enrollments', 'settings'].includes(savedTab)) return savedTab;
            if (role === 'instructor' && ['manage', 'create', 'settings'].includes(savedTab)) return savedTab;
        }
        return role === 'instructor' ? 'manage' : 'courses';
    });

    useEffect(() => {
        sessionStorage.setItem('dashboard_active_tab', activeTab);
    }, [activeTab]);

    if (!user) return <Navigate to="/login" />;

    return (
        <div className="dashboard-layout">
            
            <DashboardNavbar 
                user={user} 
                logout={logout} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
            />
            <main className="dashboard-main">
                    {user.role === 'student' && (
                        <>
                            <div style={{ display: activeTab === 'courses' ? 'block' : 'none' }}>
                                <CourseList />
                            </div>
                            <div style={{ display: activeTab === 'enrollments' ? 'block' : 'none' }}>
                                <MyEnrollments />
                            </div>
                        </>
                    )}

                    {user.role === 'instructor' && (
                        <>
                            <div style={{ display: activeTab === 'manage' ? 'block' : 'none' }}>
                                <InstructorCourses />
                            </div>
                            <div style={{ display: activeTab === 'create' ? 'block' : 'none' }}>
                                <CreateCourse />
                            </div>
                        </>
                    )}

                    <div style={{ display: activeTab === 'settings' ? 'block' : 'none' }}>
                        <div className="flex flex-col md:flex-row justify-center items-start gap-8 max-w-6xl mx-auto w-full">
                            <div className="w-full max-w-md mx-auto md:mx-0">
                                <ChangePassword />
                            </div>
                        </div>
                    </div>
            </main>
        </div>
    );
};

export default Dashboard;