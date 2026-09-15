import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ChevronDownIcon = ({ isOpen }) => (
    <ChevronDown 
        size={16} 
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }} 
    />
);

const EditorSection = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="ce-section mb-6">
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="ce-section-header">
                <div className="flex items-center gap-2.5">
                    <span className="font-semibold text-slate-800">{title}</span>
                </div>
                <ChevronDownIcon isOpen={isOpen} />
            </button>
            {isOpen && <div className="ce-section-body">{children}</div>}
        </div>
    );
};
export default EditorSection;
