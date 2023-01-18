//Arquivo que lida com requições ao TMDB, uma forma de prevenir caso no futuro venha a ser necessario
//utilizar uma outra API, basta alterar esse arquivo mantendo a mesma estrutura.

const API_KEY = "f6b66bc3a1bda3d760975538662acf34";
const API_BASE = "https://api.themoviedb.org/3"; //base que importa os filmes pela URL do TMDB

//--ITENS QUE VÃO SER PEGOS--
//Originais Netflix(originals)
//recomendados(trending)
//em alta(top rated)
//ação
//comedia
//romance
//terror
//documentarios

//manda um fatch na URL, pegar o JSON e retornar pra ess variavel e repetir em todos os itens
const basicFetch = async (endpoint) => { //função que manda um endpoint que pega um resultado e trás para a const 
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json; 
}

export default {
    //criar funções que pegam a lista dos itens e armazenar elas
    getHomeList: async () => {
        return [
            {
                slug: "originals",
                title: "Originais da Netflix",
                items: await basicFetch(`/discover/tv?with_network=213&language-pt-BR&api_key=${API_KEY}`)

            }, 
            {
                slug: "trending",
                title: "Recomendados para você",
                items: await basicFetch(`/trending/all/week?language-pt-BR&api_key=${API_KEY}`)

            },           {
                slug: "top rated",
                title: "Em alta",
                items: await basicFetch(`/movie/top_rated?language-pt-BR&api_key=${API_KEY}`)

            },
            {
                slug: "action",
                title: "Ação",
                items: await basicFetch (`/discover/movie?with_genres=28?language=pt-BR&api_key=${API_KEY}`)

            },
            {
                slug: "comedy",
                title: "Comedia",
                items: await basicFetch (`/discover/movie?with_genres=35?language=pt-BR&api_key=${API_KEY}`)

            },
            {
                slug: "terror",
                title: "Originais da Netflix",
                items: await basicFetch (`/discover/movie?with_genres=27?language=pt-BR&api_key=${API_KEY}`)

            },
            {
                slug: "romance",
                title: "Romance",
                items: await basicFetch (`/discover/movie?with_genres=10749?language=pt-BR&api_key=${API_KEY}`)

            },
            {
                slug: "documentary",
                title: "Documentarios",
                items: await basicFetch (`/discover/movie?with_genres=99?language=pt-BR&api_key=${API_KEY}`)

            },
        ]
    },
    getMovieInfo: async  (movieId, type) =>{
        let info = {};

        if(movieId) {
            switch(type) {
                case "movie":
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                case "tv":
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;

                default:
                    info = null;
                    break; 
            }
        }

        return info;
    }

}