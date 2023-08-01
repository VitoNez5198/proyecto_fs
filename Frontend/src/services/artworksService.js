// const URL_API = "http://localhost:3000/artworks";

// export const getArtworks = async () => {
//     const response = await fetch(URL_API);
//     const data = await response.json();
//     return data;
// };

// // artworksService.js

import axios from 'axios';

// Función para obtener las obras de arte desde el backend
export const getArtworks = async () => {
    try {
        const response = await axios.get('http://localhost:3000/artworks');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las obras de arte:', error);
        throw error;
    }
};