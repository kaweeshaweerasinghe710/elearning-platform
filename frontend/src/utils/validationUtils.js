export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/;
    return passwordRegex.test(password);
};

export const validateRegistration = (name, email, password) => {
    if (!isValidEmail(email)) return 'Please enter a valid email address';
    if (name.trim().length < 3) return 'Name must be at least 3 characters long';
    if (!isValidPassword(password)) return 'Password must be at least 8 characters, with 1 simple letter & 1 symbol';
    return null;
};

export const validateLogin = (email, password) => {
    if (!isValidEmail(email)) return 'Please enter a valid email address';
    if (password.length < 6) return 'Password must be at least 6 characters long';
    return null;
};
