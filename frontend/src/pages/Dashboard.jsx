import { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import DashboardNavbar from '../components/DashboardNavbar';
import CourseList from '../components/CourseList';
import CreateCourse from '../components/CreateCourse';
import MyEnrollments from '../components/MyEnrollments';
import InstructorCourses from '../components/InstructorCourses';
import AddInstructor from '../components/AddInstructor';
import ChangePassword from '../components/ChangePassword';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    
    const [activeTab, setActiveTab] = useState(() => {
        const savedTab = localStorage.getItem('dashboard_active_tab');
        const role = user?.role;
        
        if (savedTab) {
            if (role === 'student' && ['courses', 'enrollments', 'settings'].includes(savedTab)) return savedTab;
            if (role === 'instructor' && ['manage', 'create', 'settings'].includes(savedTab)) return savedTab;
        }
        return role === 'instructor' ? 'manage' : 'courses';
    });

    useEffect(() => {
        localStorage.setItem('dashboard_active_tab', activeTab);
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
                <div>
                    {user.role === 'student' && activeTab === 'courses' && <CourseList />}
                    {user.role === 'student' && activeTab === 'enrollments' && <MyEnrollments />}

                    
                    {user.role === 'instructor' && activeTab === 'manage' && <InstructorCourses />}
                    {user.role === 'instructor' && activeTab === 'create' && <CreateCourse />}

                    {activeTab === 'settings' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
                            <ChangePassword />
                            {user.role === 'instructor' && <AddInstructor />}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;