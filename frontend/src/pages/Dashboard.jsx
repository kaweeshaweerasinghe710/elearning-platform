import { useContext, useState } from 'react';
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
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <hr className="mb-6 border-gray-200" />
            
            {user.role === 'instructor' && (
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Instructor Panel</h2>
                    <p className="text-gray-600 mb-6">Welcome! Here you can create and manage your courses.</p>
                    
                    <div className="flex gap-4 mb-6">
                        <button 
                            onClick={() => setInstructorTab('manage')} 
                            className={`px-6 py-2 rounded-md font-bold transition duration-300 ${
                                instructorTab === 'manage' ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Manage My Courses
                        </button>
                        <button 
                            onClick={() => setInstructorTab('create')} 
                            className={`px-6 py-2 rounded-md font-bold transition duration-300 ${
                                instructorTab === 'create' ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            + Create New Course
                        </button>
                    </div>

                    {instructorTab === 'create' ? <CreateCourse /> : <InstructorCourses />}
                </div>
            )}

           // STUDENT VIEW
            {user.role === 'student' && (
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Student Panel</h2>
                    <p className="text-gray-600 mb-6">Welcome! Browse available courses or check your enrollments.</p>
                    
                    <div className="flex gap-4 mb-6">
                        <button 
                            onClick={() => setStudentTab('all')} 
                            className={`px-6 py-2 rounded-md font-bold transition duration-300 ${
                                studentTab === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Browse All Courses
                        </button>
                        <button 
                            onClick={() => setStudentTab('enrolled')} 
                            className={`px-6 py-2 rounded-md font-bold transition duration-300 ${
                                studentTab === 'enrolled' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
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