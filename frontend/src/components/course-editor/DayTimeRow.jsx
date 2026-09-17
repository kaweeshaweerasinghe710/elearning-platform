const DayTimeRow = ({ day, slot, onUpdateTime, onRemove }) => (
    <div className="day-time-row">
        <div className="day-time-badge">
            <span className="font-semibold text-slate-800 text-sm">{day}</span>
        </div>
        <div className="day-time-inputs">

            <div className="day-time-field">
                <label className="time-slot-label">Start</label>
                <input type="time" value={slot.startTime} onChange={(e) => onUpdateTime('startTime', e.target.value)} className="form-input time-slot-input" />
            </div>

            <span className="text-slate-300 font-light text-lg self-end pb-2">→</span>
            <div className="day-time-field">

                <label className="time-slot-label">End</label>
                <input type="time" value={slot.endTime} onChange={(e) => onUpdateTime('endTime', e.target.value)} className="form-input time-slot-input" />
            </div>

        </div>

        <button type="button" onClick={onRemove} className="time-slot-remove-btn" title="Remove Day">✕</button>
        
    </div>
);

export default DayTimeRow;
