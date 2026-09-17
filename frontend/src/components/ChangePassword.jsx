import { useChangePassword } from '../hooks/useChangePassword';

const ChangePassword = () => {
    const { formData, setFormData, message, isSuccess, changePassword } = useChangePassword();

    return (
        <div className="form-container relative">
            <h3 className="form-title mb-6">Change Password</h3>
            
            {message && (
                <div className={`toast-alert ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                   {message}
                </div>
            )}

            <form onSubmit={changePassword} className="flex flex-col flex-1 space-y-4">
                <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input 
                        type="password" 
                        value={formData.currentPassword} 
                        onChange={(e) => setFormData({...formData, currentPassword: e.target.value})} 
                        required 
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input 
                        type="password" 
                        value={formData.newPassword} 
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})} 
                        required 
                        className="form-input"
                    />
                </div>
                <div className="form-group pb-4">
                    <label className="form-label">Confirm New Password</label>
                    <input 
                        type="password" 
                        value={formData.confirmPassword} 
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                        required 
                        className="form-input"
                    />
                </div>
                <div className="mt-auto pt-4">
                    <button type="submit" className="btn-primary w-full">Update Password</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
