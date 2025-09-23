// Validator for email

export const validateEmail = (email: string): string | null => {
    if (!email) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? null : "Invalid email address";
};


export const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required";
  
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
  
    if (!/[A-Z]/.test(password)) {
      return "Password must include at least one uppercase letter";
    }
  
    if (!/[a-z]/.test(password)) {
      return "Password must include at least one lowercase letter";
    }
  
    if (!/\d/.test(password)) {
      return "Password must include at least one number";
    }
  
    if (!/[@$!%*?&]/.test(password)) {
      return "Password must include at least one special character (@$!%*?&)";
    }
  
    return null; // ✅ valid
  };