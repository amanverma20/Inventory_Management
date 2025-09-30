// Picks API base from env if provided; falls back to deployed backend URL
export const getApiBase = () => {
    const fromEnv = process.env.REACT_APP_API_BASE_URL;
    
    if (fromEnv && typeof fromEnv === 'string' && fromEnv.trim().length > 0) {
        return fromEnv.replace(/\/$/, '');
    }
    
    // Fallback to deployed backend URL if env variable is not set
    return 'https://inventory-management-1-y5ch.onrender.com';
};


