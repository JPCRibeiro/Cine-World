"use client";
import { getMovieDetails, getSimilarMovies, getMovieCast, getMovieRecomendations, getMovieReviews } from "@/lib/movieRequests";
import FilmeLayout from './layout'; 
import { Bungee } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "@/components/slider";
import { format } from 'date-fns';
import MediaDetails from "@/components/mediaDetails";
import { TbError404 } from "react-icons/tb";
import Link from "next/link";

const bungee = Bungee({ subsets: ["latin"], weight: ['400'] });

export default function MovieDetailsPage({ params }) {
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieRecomendations, setMovieRecommendations] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);
  const [expanded, setExpanded] = useState({});
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const AVATAR_PATH = "https://media.themoviedb.org/t/p/w150_and_h150_face";
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function handleMovieDetails(id) { 
      const movieDetails = await getMovieDetails(id); 

      if (!movieDetails || movieDetails.error || movieDetails.title === undefined) { 
        setNotFound(true);
        return; 
      }

      setMovieDetails(movieDetails);
      setMovieGenres(movieDetails.genres);

      setMovieCast(await getMovieCast(id));
      setSimilarMovies(await getSimilarMovies(id));
      setMovieRecommendations(await getMovieRecomendations(id));
      setMovieReviews(await getMovieReviews(id));
    }

    handleMovieDetails(params.id); 
  }, [params.id]);

  if (notFound) {
    return (
      <div className="w-full h-[90svh] flex items-center justify-center text-[30px] flex-col text-center">
        <TbError404 size={54} className="text-primary-color"/>
        <span className={bungee.className}>OPS! NÃO ENCONTRAMOS ESSA PÁGINA!</span>
        <span className={bungee.className}>IR PARA A <Link href={'/'} className="text-primary-color underline"> PÁGINA PRINCIPAL</Link></span>
      </div>
    );
  }

  function imgLoader({src}) {
    return `${IMAGE_PATH}${src}`
  }

  const toggleExpand = (index) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <FilmeLayout movieDetails={movieDetails.title ? movieDetails.title : 'Página não encontrada - Cine World'}>
      <div>
        <div style={{ backgroundImage: `url(${IMAGE_PATH}${movieDetails.backdrop_path})`, width: '100%' }} className="flex media1200:pt-[40%] media900:pt-[60%] media600:pt-[80%] media0:pt-[130%] bg-cover bg-[center_top] absolute top-[0] bg-fixed before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-full before:pointer-events-none before:bg-[linear-gradient(to_top,#141414,#141414ad)] z-[-1]"></div>
        <main className="max-w-[1240px] m-[10rem_auto] px-[20px] flex flex-col gap-[40px]">
            <MediaDetails mediasDetails={movieDetails} genres={movieGenres} mediasElenco={movieCast}/>
            <Slider mediaType={'filmes'} medias={movieRecomendations} title={'Você Também Pode Gostar'}/>
            <Slider mediaType={'filmes'} medias={similarMovies} title={'Filmes Do Mesmo Gênero'}/>
            {movieReviews.length > 0 && (
              <div className="flex flex-col gap-[30px]">
                <h2 className="relative text-[30px] w-fit before:content-[''] before:bg-primary-color before:absolute before:w-full before:h-[5px] before:bottom-0">
                  <span className={bungee.className}>
                    Avaliações
                  </span>
                </h2>
                {movieReviews.map((movieReview, index) => (
                  <div key={index} className="flex gap-[30px]">
                    {movieReview.author_details.avatar_path ? (
                      <Image className="rounded-[100%] w-[75px] h-[75px]" loader={imgLoader} src={`${AVATAR_PATH}${movieReview.author_details.avatar_path}`} alt={movieReview.author_details.username} width="100" height="100"/>
                    ) : (
                      <div className="bg-primary-color min-w-[75px] h-[75px] rounded-[100%] flex items-center justify-center text-[24px] font-bold text-[black] select-none">{(movieReview.author_details.username).slice(0,1)}</div>
                    )}
                    <div className="flex flex-col gap-[10px]"> 
                      <div className="flex flex-col">
                        <span className="text-[20px] font-bold">{movieReview.author_details.username}</span>
                        <span>{format(new Date(movieReview.created_at), 'HH:mm:ss - dd/MM/yyyy')}</span>
                      </div>
                      <p className={expanded[index] ? '' : 'line-clamp-4'}>{movieReview.content}</p>
                      {movieReview.content.length > 559 && ( 
                        <button onClick={() => toggleExpand(index)} className="w-fit text-primary-color font-bold hover:underline">
                          {expanded[index] ? 'Mostrar menos' : 'Ler mais'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
        </main>
        </div>
    </FilmeLayout>
  );
}