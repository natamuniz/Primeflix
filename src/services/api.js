import axios from 'axios';

// Base da URL : https://api.themoviedb.org/3/

//URL da api: movie/now_playing?api_key=5c40782572053cd2cd1f5b920ab9a32b

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;