import { getApiBase } from './apiBase';

export const resolveAssetUrl = (url) => {
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    const base = getApiBase();
    const path = String(url).replace(/^\/+/, '');
    return `${base}/${path}`;
};


