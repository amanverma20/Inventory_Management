// Picks API base from env if provided; falls back to deployed backend URL
export const getApiBase = () => {
    const fromEnv = process.env.REACT_APP_API_BASE_URL;
    
    // Debug logging (only in development)
    if (process.env.NODE_ENV === 'development') {
        console.log('🔍 Environment Debug:');
        console.log('  NODE_ENV:', process.env.NODE_ENV);
        console.log('  REACT_APP_API_BASE_URL:', fromEnv);
        console.log('  All REACT_APP vars:', Object.keys(process.env).filter(k => k.startsWith('REACT_APP_')));
    }
    
    if (fromEnv && typeof fromEnv === 'string' && fromEnv.trim().length > 0) {
        const cleanUrl = fromEnv.replace(/\/$/, '');
        console.log('✅ Using environment API URL:', cleanUrl);
        return cleanUrl;
    }
    
    // Fallback to deployed backend URL if env variable is not set
    const fallbackUrl = 'https://inventory-management-1-y5ch.onrender.com';
    console.log('⚠️ Using fallback API URL:', fallbackUrl);
    return fallbackUrl;
};


