import { useState } from 'react';
import { X } from 'lucide-react';
import api from '../../utils/api';

const ResourceRow = ({ resource, onUpdate, onRemove }) => {
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const { data } = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onUpdate('url', data.url);
            
            setTimeout(() => {
                if (file.type.startsWith('video/')) onUpdate('resourceType', 'video');
                else if (file.type === 'application/pdf') onUpdate('resourceType', 'pdf');
                else onUpdate('resourceType', 'file');
            }, 100);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="ce-row">
            <input type="text" value={resource.title || ''} onChange={(e) => onUpdate('title', e.target.value)} placeholder="Resource Title" className="form-input flex-1 max-w-sm" />
            <div className="flex-1 flex gap-2 items-center">
                <input type="file" onChange={handleFileUpload} className="form-input p-1.5 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" accept=".pdf, image/*, video/*" />
                {uploading && <span className="text-xs text-blue-500 font-medium whitespace-nowrap">Uploading...</span>}
                {resource.url && !uploading && <span className="text-xs text-emerald-600 font-medium truncate max-w-[150px]" title={resource.url}>✓ Uploaded</span>}
            </div>
            <button type="button" onClick={onRemove} className="ce-remove-btn" title="Remove"><X size={14} /></button>
        </div>
    );
};
export default ResourceRow;
