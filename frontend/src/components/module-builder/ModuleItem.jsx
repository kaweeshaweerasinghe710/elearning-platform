const MaterialRow = ({ item, onUpdate, onRemove }) => (
    <div className="material-row">
        <select 
            value={item.itemType} 
            onChange={(e) => onUpdate('itemType', e.target.value)}
            className="material-select"
        >
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
            <option value="link">Link</option>
        </select>
        <input 
            type="text" value={item.title} onChange={(e) => onUpdate('title', e.target.value)} required placeholder="Item Title"
            className="material-input"
        />
        <input 
            type="url" value={item.url} onChange={(e) => onUpdate('url', e.target.value)} required placeholder="URL"
            className="material-input"
        />
        <button type="button" onClick={onRemove} className="icon-remove-btn" title="Remove Item">
            ✕
        </button>
    </div>
);

const ModuleItem = ({ mod, onUpdateTitle, onRemove, items, onAddItem, onUpdateItem, onRemoveItem }) => (
    <div className="module-card">
        <div className="flex justify-between items-center mb-4">
            <input 
                type="text" value={mod.title} onChange={(e) => onUpdateTitle(e.target.value)} required placeholder="Module Title (e.g. Week 1)"
                className="w-2/3 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black outline-none text-sm font-medium"
            />
            <button type="button" onClick={onRemove} className="remove-btn">
                Remove
            </button>
        </div>

        <div className="space-y-3 mb-4 pl-4 border-l-2 border-gray-100">
            {items.map((item, itemIdx) => (
                <MaterialRow 
                    key={itemIdx} 
                    item={item} 
                    onUpdate={(field, val) => onUpdateItem(itemIdx, field, val)} 
                    onRemove={() => onRemoveItem(itemIdx)} 
                />
            ))}
            <button type="button" onClick={onAddItem} className="text-sm font-medium text-gray-600 hover:text-black mt-2">
                + Add Item
            </button>
        </div>
    </div>
);

export default ModuleItem;
