import { X } from 'lucide-react';

const ClassLinkRow = ({ link, onUpdate, onRemove }) => (
    <div className="ce-row">
        <input type="text" value={link.title || ''} onChange={(e) => onUpdate('title', e.target.value)} placeholder="Class Title" className="form-input flex-1" />

        <input type="url" value={link.url || ''} onChange={(e) => onUpdate('url', e.target.value)} placeholder="Meeting URL (Zoom, Teams...)" className="form-input flex-1" />

        <input type="date" value={link.date ? link.date.split('T')[0] : ''} onChange={(e) => onUpdate('date', e.target.value)} className="form-input ce-date-input" />
        
        <button type="button" onClick={onRemove} className="ce-remove-btn" title="Remove"><X size={14} /></button>
    </div>
);
export default ClassLinkRow;
