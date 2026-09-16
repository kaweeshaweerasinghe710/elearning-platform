import { Plus, X } from 'lucide-react';
import ClassLinkRow from './ClassLinkRow';
import ResourceRow from './ResourceRow';

const WeekItem = ({ week, wIdx, onChange, onRemove, onSave }) => {
    const addClassLink = () => onChange('classLinks', [...(week.classLinks || []), { title: '', url: '', date: '' }]);
    const updateClassLink = (idx, field, val) => {
        const newLinks = [...(week.classLinks || [])];
        newLinks[idx] = { ...newLinks[idx], [field]: val };
        onChange('classLinks', newLinks);
    };
    const removeClassLink = (idx) => onChange('classLinks', (week.classLinks || []).filter((_, i) => i !== idx));

    const addResource = () => onChange('resources', [...(week.resources || []), { title: '', url: '' }]);
    const updateResource = (idx, field, val) => {
        const newRes = [...(week.resources || [])];
        newRes[idx] = { ...newRes[idx], [field]: val };
        onChange('resources', newRes);
    };
    const removeResource = (idx) => onChange('resources', (week.resources || []).filter((_, i) => i !== idx));

    return (
        <div className="ce-week-card mb-4 border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-100">
                <input type="text" value={week.title} onChange={(e) => onChange('title', e.target.value)} placeholder="Week Title (e.g. Week 1)" className="form-input flex-1 font-bold text-slate-800 bg-white" />
                <div className="flex items-center gap-2 ml-4">
                    <button type="button" onClick={onSave} className="btn-primary py-2 px-4 shadow-sm text-sm">Save Week</button>
                    <button type="button" onClick={onRemove} className="ce-remove-btn" title="Remove Week"><X size={14} /></button>
                </div>
            </div>
            
            <div className="p-4 space-y-6">
                <div>
                    <label className="text-xs font-semibold text-slate-500 mb-2 block uppercase tracking-wider"> Special Announcement</label>
                    <textarea value={week.announcement || ''} onChange={(e) => onChange('announcement', e.target.value)} rows="2" placeholder="Add a special announcement for this week..." className="form-input resize-none" />
                </div>
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider"> Class Links</label>
                        <button type="button" onClick={addClassLink} className="ce-add-btn text-xs py-1.5"><Plus size={15} /> Add Link</button>
                    </div>
                    <div className="space-y-2">
                        {(week.classLinks || []).map((link, idx) => (<ClassLinkRow key={idx} link={link} onUpdate={(f, v) => updateClassLink(idx, f, v)} onRemove={() => removeClassLink(idx)} />))}
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resources</label>
                        <button type="button" onClick={addResource} className="ce-add-btn text-xs py-1.5"><Plus size={15} /> Add Resource</button>
                    </div>
                    <div className="space-y-2">
                        {(week.resources || []).map((res, idx) => (<ResourceRow key={idx} resource={res} onUpdate={(f, v) => updateResource(idx, f, v)} onRemove={() => removeResource(idx)} />))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WeekItem;
