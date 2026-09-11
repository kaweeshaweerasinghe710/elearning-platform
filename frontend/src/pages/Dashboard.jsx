import { useContext, useState } from 'react'; // <-- Add useState
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CourseList from '../components/CourseList';
import CreateCourse from '../components/CreateCourse';
import MyEnrollments from '../components/MyEnrollments';
import InstructorCourses from '../components/InstructorCourses';  

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [studentTab, setStudentTab] = useState('all'); 
     const [instructorTab, setInstructorTab] = useState('manage');

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Dashboard</h1>
            <hr />

            {user.role === 'instructor' && (
                <div>
                    <h2>Instructor Panel</h2>
                    <p>Welcome! Here you can create and manage your courses.</p>
                    <CreateCourse />
                    {instructorTab === 'create' ? <CreateCourse /> : <InstructorCourses />}
                </div>
            )}


            {user.role === 'student' && (
                <div>
                    <h2>Student Panel</h2>
                    <div style={{ marginBottom: '20px' }}>
                        <button 
                            onClick={() => setStudentTab('all')} 
                            style={{ padding: '10px', background: studentTab === 'all' ? 'blue' : 'lightgray', color: studentTab === 'all' ? 'white' : 'black', marginRight: '10px', cursor: 'pointer', border: 'none' }}
                        >
                            Browse All Courses
                        </button>
                        <button 
                            onClick={() => setStudentTab('enrolled')} 
                            style={{ padding: '10px', background: studentTab === 'enrolled' ? 'green' : 'lightgray', color: studentTab === 'enrolled' ? 'white' : 'black', cursor: 'pointer', border: 'none' }}
                        >
                            My Enrollments
                        </button>
                    </div>
                    {studentTab === 'all' ? <CourseList /> : <MyEnrollments />}
                </div>
            )}
        </div>
    );
};

export default Dashboard;