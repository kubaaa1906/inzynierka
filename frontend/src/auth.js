import { jwtDecode } from 'jwt-decode';

export const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        return decoded.czyAdmin === true;  // Zakładając, że token zawiera pole 'czyAdmin'
    } catch (error) {
        return false;
    }
};

