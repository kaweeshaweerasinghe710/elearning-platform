import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, setPage, totalPages }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-3 mt-6 py-4 border-t border-slate-100">
            <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-semibold text-slate-600 min-w-[90px] text-center">
                Page {page} of {totalPages}
            </span>
            <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;
