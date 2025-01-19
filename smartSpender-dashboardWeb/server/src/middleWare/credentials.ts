// Importez le tableau allowedOrigins
import { allowedOrigins } from '../config/allowedOrigins';

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    // Assurez-vous que allowedOrigins est un tableau
    if (Array.isArray(allowedOrigins) && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials;
