import ModuleItem from './module-builder/ModuleItem';

const ModuleBuilder = ({ modules, setModules }) => {
    const addModule = () => setModules([...modules, { title: '', items: [] }]);
    const updateModuleTitle = (index, newTitle) => {
        const updated = [...modules];
        updated[index].title = newTitle;
        setModules(updated);
    };
    const removeModule = (index) => setModules(modules.filter((_, i) => i !== index));
    
    const addItem = (modIdx) => {
        const updated = [...modules];
        updated[modIdx].items.push({ title: '', itemType: 'pdf', url: '' });
        setModules(updated);
    };
    const updateItem = (modIdx, itemIdx, field, value) => {
        const updated = [...modules];
        updated[modIdx].items[itemIdx][field] = value;
        setModules(updated);
    };
    const removeItem = (modIdx, itemIdx) => {
        const updated = [...modules];
        updated[modIdx].items = updated[modIdx].items.filter((_, i) => i !== itemIdx);
        setModules(updated);
    };

    return (
        <div className="module-builder-container">
            <div className="module-builder-header">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Curriculum</h3>
                    <p className="text-sm text-gray-500">Organize your course into modules and items.</p>
                </div>
                <button type="button" onClick={addModule} className="btn-secondary">
                    Add Module
                </button>
            </div>

            <div className="space-y-6">
                {modules.map((mod, modIdx) => (
                    <ModuleItem 
                        key={modIdx} 
                        mod={mod}
                        items={mod.items}
                        onUpdateTitle={(val) => updateModuleTitle(modIdx, val)}
                        onRemove={() => removeModule(modIdx)}
                        onAddItem={() => addItem(modIdx)}
                        onUpdateItem={(itemIdx, field, val) => updateItem(modIdx, itemIdx, field, val)}
                        onRemoveItem={(itemIdx) => removeItem(modIdx, itemIdx)}
                    />
                ))}
                
                {modules.length === 0 && (
                    <div className="text-center py-8 bg-white border border-dashed border-gray-300 rounded-md text-sm text-gray-500">
                        No modules added yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModuleBuilder;
