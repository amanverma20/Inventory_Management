import { getApiBase } from './apiBase';

export const resolveAssetUrl = (url) => {
    if (!url) return '';
    
    try {
        const raw = String(url);
        const base = getApiBase();
        
        if (!base) {
            return raw;
        }

        // If already absolute but pointing to localhost, rewrite to backend base
        const localhostRegex = /^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?\/(.*)$/i;
        const match = raw.match(localhostRegex);
        if (match) {
            const path = match[2];
            return `${base.replace(/\/$/, '')}/${path.replace(/^\/+/, '')}`;
        }

        // If relative path, prefix with backend base
        if (!/^https?:\/\//i.test(raw)) {
            const path = raw.replace(/^\/+/, '');
            return `${base.replace(/\/$/, '')}/${path}`;
        }

        // If absolute to non-localhost, return as-is
        return raw;
    } catch (error) {
        console.error('Error resolving asset URL:', error);
        return url; // Return original URL on error
    }
};


