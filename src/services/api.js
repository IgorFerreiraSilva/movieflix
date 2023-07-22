import axios from "axios";
//base da url: https://api.themoviedb.org/3/
//URL da API: /movie/now_playing?api_key=f411e9aa2fbfd8f96ab892decd69b295&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})


export default api