import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import './App.css'
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header"

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false); 
    

    useEffect(()=> {
        const loadAll = async () => {
            //pegando a lista TOTAL
            let list = await Tmdb.getHomeList();
            setMovieList(list);


            //Pegando o Featured
            let originals = list.filter(i=> i.slug === "originals");
            let randomChosen = Math.floor(Math.random () * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await  Tmdb.getMovieInfo(chosen.id, "tv");
            setFeaturedData(chosenInfo);
        }

        loadAll();
    }, []);


    useEffect(() =>{
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else { 
                setBlackHeader(false);
            }
        }
        window.addEventListener('scroll', scrollListener);

        return () =>{
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);
    return  (
        <div className="page">

            <Header black={blackHeader} />

            {featuredData && <FeaturedMovie item={featuredData}/> }

            <section className="lists">
            {movieList.map((item, key)=>(
                <MovieRow key={key} title={item.title} items={item.items}/>
            ))}
            </section>

            <footer>
                Feito por Pedro H. Moreira dos Reis, baseado na live de 2020 do professor Bonieky Lacerda.<br></br>
                Direitos de imagem para a netflix.<br></br>
                Dados pegos pelo site Themoviedb.org
            </footer>

            {movieList.length <= 0 &&
                    <div className="loading">
                        <img src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2_w200.gif" alt="Carregando"></img>
                    </div>
                        }
                </div>
    );

}
