import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <hr />
            {user.role === 'instructor' && (
                <div>
                    <h2>Instructor Panel</h2>
                    <p>Welcome! Here you can create and manage your courses.</p>
                    <button style={{ padding: '10px', background: 'orange' }}>+ Create New Course</button>
                </div>
            )}
            {user.role === 'student' && (
                <div>
                    <h2>Student Panel</h2>
                    <p>Welcome! Browse available courses or check your enrollments.</p>
                    <button style={{ padding: '10px', background: 'blue', color: 'white', marginRight: '10px' }}>View All Courses</button>
                    <button style={{ padding: '10px', background: 'green', color: 'white' }}>My Enrollments</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;