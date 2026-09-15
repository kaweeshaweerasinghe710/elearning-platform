import { useState } from 'react';
import AccordionSection from './AccordionSection';
import StudentCourseModules from './StudentCourseModules';

const EnrolledCourseDetail = ({ course, onBack }) => {
    return (
        <div className="max-w-5xl w-full">
            <button 
                onClick={onBack}
                className="mb-8 flex items-center gap-2 text-gray-500 hover:text-black font-medium text-sm transition-colors"
            >
                ← Back to My Enrollments
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                {course.title}
            </h2>
            <div className="bg-gray-50 p-6 rounded-md border border-gray-200">

                {course.schedule && course.schedule.weeklySlots && course.schedule.weeklySlots.length > 0 ? (
                    <AccordionSection title="Weekly Schedule" showCollapseAll={false}>
                        <div className="flex flex-col gap-3">
                            {course.schedule.startDate && (
                                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                                    <span className="text-sm font-semibold text-slate-700">
                                        Starts: {new Date(course.schedule.startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                </div>
                            )}
                            {course.schedule.weeklySlots.map((slot, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        {slot.day?.charAt(0)}
                                    </div>
                                    <div className="flex items-center gap-6 text-sm">
                                        <span className="font-semibold text-slate-800 w-24">
                                            {slot.day}
                                        </span>
                                        <span className="text-slate-600">
                                            {slot.startTime} — {slot.endTime}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionSection>
                ) : (
                    <div className="p-6 text-center text-gray-500 font-medium border border-dashed border-gray-300 rounded-md bg-white">
                        No schedule has been set for this course yet.
                    </div>
                )}
            </div>
            <StudentCourseModules weeks={course.weeks} />
        </div>
    );
};

export default EnrolledCourseDetail;
