import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AccordionSection = ({ title, children, showCollapseAll = false, onCollapseAll, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-200 rounded-md mb-4 bg-white">
            <div 
                className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                
                <div className="flex items-center gap-3">
                    <div className="text-gray-400">
                        <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }} />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                </div>
                
                {showCollapseAll && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onCollapseAll(); setIsOpen(false); }}
                        className="text-blue-600 text-sm hover:underline"
                    >
                        Collapse all
                    </button>
                )}
            </div>
            
            {isOpen && (
                <div className="p-5 pt-0 border-t border-gray-100 flex flex-col gap-3 mt-2">
                    {children}
                </div>
            )}
        </div>
    );
};

export default AccordionSection;
