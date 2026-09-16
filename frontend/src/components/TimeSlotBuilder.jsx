import DayToggle from './course-editor/DayToggle';
import DayTimeRow from './course-editor/DayTimeRow';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TimeSlotBuilder = ({ schedule, setSchedule }) => {
    const formatStartDate = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr.includes('T')) return dateStr.split('T')[0];
        return dateStr;
    };
    
    const startDate = formatStartDate(schedule?.startDate);
    const weeklySlots = schedule?.weeklySlots || [];

    const updateStartDate = (date) => {
        setSchedule({ ...schedule, startDate: date, weeklySlots });
    };

    const toggleDay = (day) => {
        const exists = weeklySlots.find(s => s.day === day);
        if (exists) {
            setSchedule({ 
                ...schedule, 
                startDate, 
                weeklySlots: weeklySlots.filter(s => s.day !== day) 
            });
        } else {
            setSchedule({ 
                ...schedule, 
                startDate, 
                weeklySlots: [...weeklySlots, { day, startTime: '09:00', endTime: '10:00' }] 
            });
        }
    };

    const updateSlotTime = (day, field, value) => {
        setSchedule({
            ...schedule,
            startDate,
            weeklySlots: weeklySlots.map(s => s.day === day ? { ...s, [field]: value } : s)
        });
    };

    const removeDay = (day) => {
        setSchedule({
            ...schedule,
            startDate,
            weeklySlots: weeklySlots.filter(s => s.day !== day)
        });
    };

    const sortedSlots = [...weeklySlots].sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day));

    return (
        <div className="time-slot-builder">
            <div className="time-slot-builder-header">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 ml-10"> 
                        Schedule & Time Slots
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 ml-10">Set a start date and choose your weekly class days with times.</p>
                </div>
            </div>

            <div className="time-slot-list">
                <div className="schedule-start-date">
                    <label className="form-label flex items-center gap-2">
                        Course Start Date
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => updateStartDate(e.target.value)}
                        className="form-input max-w-xs"
                    />
                </div>

           
                <div className="schedule-day-selector">
                    <label className="form-label flex items-center gap-2 mb-3">
                         Select Class Days
                    </label>
                    <div className="day-toggle-grid">
                        {DAYS.map(day => (
                            <DayToggle
                                key={day}
                                day={day}
                                isActive={weeklySlots.some(s => s.day === day)}
                                onToggle={() => toggleDay(day)}
                            />
                        ))}
                    </div>
                </div>

                
                {sortedSlots.length > 0 && (
                    <div className="schedule-times-section">
                        <label className="form-label flex items-center gap-2 mb-3">
                             Set Times for Each Day
                        </label>
                        <div className="space-y-3">
                            {sortedSlots.map(slot => (
                                <DayTimeRow
                                    key={slot.day}
                                    day={slot.day}
                                    slot={slot}
                                    onUpdateTime={(field, val) => updateSlotTime(slot.day, field, val)}
                                    onRemove={() => removeDay(slot.day)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {sortedSlots.length === 0 && (
                    <div className="time-slot-empty">
                        <p className="font-medium text-slate-600">No class days selected</p>
                        <p className="text-sm text-slate-400 mt-1">Click on the days above to add them to your weekly schedule.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimeSlotBuilder;
