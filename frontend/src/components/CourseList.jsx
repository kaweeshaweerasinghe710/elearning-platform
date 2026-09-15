import { useCourses } from '../hooks/useCourses';
import CourseCard from './CourseCard'; 

const CourseList = () => {
    const { courses, loading, enroll } = useCourses();
  
    const handleEnroll = async (courseId) => {
        const result = await enroll(courseId);
        if (result.success) {
            alert('Successfully enrolled in the course! ');
        } else {
            alert(result.message);
        }
    };


    if (loading) return <div className="text-center py-20 text-gray-500 font-bold">Loading courses...</div>;

    return (
        <div className="list-container">
            <div className="list-header">
                <h3 className="list-title">Explore Courses</h3>
            </div>
            
            {courses.length === 0 ? (
                <div className="empty-state">
                    No courses available at the moment.
                </div>
            ) : (
                <div className="list-grid">
                    {courses.map((course) => (
                        <CourseCard 
                            key={course._id} 
                            course={course} 
                            onEnroll={handleEnroll} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseList;