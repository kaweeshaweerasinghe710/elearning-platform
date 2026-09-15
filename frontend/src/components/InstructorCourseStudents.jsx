import { Users } from 'lucide-react';

const InstructorCourseStudents = ({ enrolledStudents }) => (
    <div className="students-panel">
        <div className="flex items-center justify-between mb-4">
            <h5 className="font-bold text-slate-800 text-sm">Enrolled Students</h5>
            <span className="text-slate-500 text-xs font-semibold px-2 py-1 bg-white rounded-md border border-slate-200">
                {enrolledStudents.length} Total
            </span>
        </div>
        {enrolledStudents.length > 0 ? (
            <div className="space-y-2">
                {enrolledStudents.map((enrollment) => (
                    <div key={enrollment._id} className="student-item">
                        <div>
                            <p className="text-sm font-bold text-slate-800">{enrollment.student?.name}</p>
                            <p className="text-xs text-slate-500">{enrollment.student?.email}</p>
                        </div>
                        <div className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">
                            {new Date(enrollment.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-dashed border-slate-200">
                <Users size={16} className="mx-auto text-slate-300 mb-2" />
                <p className="text-slate-500 text-sm font-medium">No students enrolled yet.</p>
            </div>
        )}
    </div>
);

export default InstructorCourseStudents;
