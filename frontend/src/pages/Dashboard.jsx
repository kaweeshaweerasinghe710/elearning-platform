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

    const [visitedTabs, setVisitedTabs] = useState([activeTab]);

    useEffect(() => {
        localStorage.setItem('dashboard_active_tab', activeTab);
        setVisitedTabs(prev => prev.includes(activeTab) ? prev : [...prev, activeTab]);
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
                            {visitedTabs.includes('courses') && (
                                <div style={{ display: activeTab === 'courses' ? 'block' : 'none' }}>
                                    <CourseList />
                                </div>
                            )}
                            {visitedTabs.includes('enrollments') && (
                                <div style={{ display: activeTab === 'enrollments' ? 'block' : 'none' }}>
                                    <MyEnrollments />
                                </div>
                            )}
                        </>
                    )}

                    {user.role === 'instructor' && (
                        <>
                            {visitedTabs.includes('manage') && (
                                <div style={{ display: activeTab === 'manage' ? 'block' : 'none' }}>
                                    <InstructorCourses />
                                </div>
                            )}
                            {visitedTabs.includes('create') && (
                                <div style={{ display: activeTab === 'create' ? 'block' : 'none' }}>
                                    <CreateCourse />
                                </div>
                            )}
                        </>
                    )}

                    {visitedTabs.includes('settings') && (
                        <div style={{ display: activeTab === 'settings' ? 'block' : 'none' }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
                                <ChangePassword />
                                {user.role === 'instructor' && <AddInstructor />}
                            </div>
                        </div>
                    )}
            </main>
        </div>
    );
};

export default Dashboard;