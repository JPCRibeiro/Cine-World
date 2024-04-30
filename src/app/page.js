"use client";
import Link from "next/link";
import { Bungee } from "next/font/google";
import { useEffect, useRef, useState, Suspense } from "react";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { getMoviesGenres, getSeriesGenres, getTrending } from "@/lib/movieRequests";

const bungee = Bungee({ subsets: ["latin"], weight: ['400'] });

export default function HomePage() {
  const sliderRef = useRef(null);
  const carouselRef = useRef(null);
  const [direction, setDirection] = useState(-1);
  const [trendings, setTrendings] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [seriesGenres, setSeriesGenres] = useState([]);
  const [width, setWidth] = useState(0); 
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    async function handleTrendings() {
      const results = await getTrending();
      setTrendings(results);
    }

    async function handleMoviesGenres() {
      const moviesGenres = await getMoviesGenres();
      setMoviesGenres(moviesGenres);
    }

    async function handleSeriesGenres() {
      const seriesGenres = await getSeriesGenres();
      setSeriesGenres(seriesGenres);
    }

    handleTrendings();  
    handleMoviesGenres();
    handleSeriesGenres();
  }, []);

  function handlePrevClick() {
    if (direction === -1) {
      sliderRef.current.appendChild(sliderRef.current.firstElementChild);
      setDirection(1);
    }
    carouselRef.current.style.justifyContent = 'flex-end';
    sliderRef.current.style.transform = `translate(${width}px)`;
  };

  function handleNextClick() {
    if (direction === 1) {
      sliderRef.current.prepend(sliderRef.current.lastElementChild);
      setDirection(-1);
    }
    carouselRef.current.style.justifyContent = 'flex-start';
    sliderRef.current.style.transform = `translate(${-width}px)`;
  };

  function handleTransitionEnd(event) {
    if (event.propertyName !== 'transform') return;
  
    if (direction === -1) {
      sliderRef.current.appendChild(sliderRef.current.firstElementChild);
    } else if (direction === 1) {
      sliderRef.current.prepend(sliderRef.current.lastElementChild);
    }
  
    sliderRef.current.style.transition = 'none';
    sliderRef.current.style.transform = 'translate(0)';
    setTimeout(() => {
      sliderRef.current.style.transition = 'all 250ms ease-out 0s';
    });
  }

  function handleResize() {
    sliderRef.current.style.transition = 'none';
  
    setWidth(window.innerWidth);
  
    if (direction === -1) {
      sliderRef.current.style.transform = 'translate(0)';
    } else {
      sliderRef.current.prepend(sliderRef.current.lastElementChild);
      setDirection(-1);
      sliderRef.current.style.transform = 'translate(0)';
    }
  
    setTimeout(() => {
      sliderRef.current.style.transition = '250ms ease-out';
    }, 0);
  };
  
  useEffect(() => {
    setWidth(window.innerWidth);
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isUserInteracting) {
        handleNextClick();
      }
    }, 5000);
  
    return () => clearInterval(interval);
  }, [handleNextClick]);
  
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <main>
          <div ref={carouselRef} className="flex z-9 justify-start overflow-hidden w-full relative">
            <ol ref={sliderRef} className="flex shrink-0 relative [transition:200ms_ease-out] overflow-hidden h-[100svh]" onTransitionEnd={handleTransitionEnd}>
              {trendings.map((trending, index) => (
                <li key={index} className="flex relative h-full w-full overflow-hidden">
                  <div style={{ backgroundImage: `url(${IMAGE_PATH}${trending.backdrop_path})`, width: width }} className="flex media1200:pt-[45%] media900:pt-[60%] media600:pt-[80%] media0:pt-[130%] bg-cover bg-[center_top]"></div>
                  <div className="w-full h-full absolute top-0 left-0 bg-[linear-gradient(to_right,rgb(0_0_0/85%),rgba(0,0,0,0))]"></div>
                  <div className="h-full absolute left-0 top-0 flex flex-col justify-center w-full px-[30px] media1200:pl-[12rem] media900:pl-[5rem] media600:px-[2rem]">
                    <div className="text-white flex flex-col justify-center gap-[20px] relative z-20 media1200:w-[40%] media900:w-[50%] media600:w-[unset]">
                      <h2 className="select-none text-[2.125rem] media1200:text-[40px] media900:text-[2rem] media0:text-[2rem]">
                        <span className={bungee.className}>
                          {trending.media_type === 'movie' ? trending.title : trending.name}
                          <span className="text-primary-color">.</span>
                        </span>
                      </h2>
                      <div className="flex items-center gap-[10px] select-none">
                        {[...trending.genre_ids].splice(0, 2).map((genreId, index) => (
                          <div key={index} className="p-[5px_15px] rounded-[20px] w-fit text-[14px] font-[600] border-[3px] border-primary-color bg-primary-color">
                            {trending.media_type === 'movie' ? (
                              <>
                                {moviesGenres.find(e => e.id === genreId) && moviesGenres.find(e => e.id === genreId).name}
                              </>
                            ) : (
                              <>
                                {seriesGenres.find(e => e.id === genreId) && seriesGenres.find(e => e.id === genreId).name}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                      {trending.overview && <p className="select-none line-clamp-4 text-[18px]">{trending.overview}</p>}
                      <Link href={`/${trending.media_type === 'movie' ? 'filmes' : 'series'}/${trending.id}`} className="z-[12] flex p-[10px_20px] bg-primary-color rounded-[5px] w-fit font-[500] mt-[5px] items-center gap-[10px] hover:bg-[#951717bd] [transition:200ms] hover:text-[#ffffff]">
                        <span className="text-[18px] select-none">Mais detalhes</span>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="z-[15] absolute bottom-[5%] left-[50%] -translate-x-1/2">
              <div className="flex gap-32 relative text-white">
                <button onClick={() => { handlePrevClick(); setIsUserInteracting(true); }} className="rounded-[100%] flex items-center justify-center">
                  <FaCircleChevronLeft className="hover:text-primary-color [transition:200ms] text-[40px] rounded-[100%] flex"/>
                </button>
                <button onClick={() => { handleNextClick(); setIsUserInteracting(true); }} className="rounded-[100%] flex items-center justify-center">
                  <FaCircleChevronRight className="hover:text-primary-color [transition:200ms] text-[40px] rounded-[100%] flex"/>
                </button>
              </div>
            </div>
          </div>
        </main>
      </Suspense>
  );
}

/*
before:w-full before:h-[30%] before:z-10 before:absolute before:bottom-0 before:left-0 before:pointer-events-none before:bg-[linear-gradient(to_top,#141414,rgba(0,0,0,0))]
*/