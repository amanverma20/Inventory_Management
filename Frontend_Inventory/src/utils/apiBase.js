// Picks API base from env if provided; falls back to relative path to leverage CRA proxy
export const getApiBase = () => {
    const fromEnv = process.env.REACT_APP_API_BASE_URL;
    if (fromEnv && typeof fromEnv === 'string' && fromEnv.trim().length > 0) {
        return fromEnv.replace(/\/$/, '');
    }
    return '';
};


