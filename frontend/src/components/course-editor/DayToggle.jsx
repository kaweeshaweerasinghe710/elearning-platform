const DAY_SHORT = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };

const DayToggle = ({ day, isActive, onToggle }) => (
    <button
        type="button"
        onClick={onToggle}
        className={`day-toggle ${isActive ? 'day-toggle-active' : 'day-toggle-inactive'}`}
    >
        <span className="day-toggle-label">{DAY_SHORT[day]}</span>
    </button>
);

export default DayToggle;
