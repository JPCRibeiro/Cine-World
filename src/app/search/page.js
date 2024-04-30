"use client"
import { getSearchRequest } from "@/lib/movieRequests";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Bungee } from "next/font/google";
import Link from "next/link";
import { useSearch } from "@/components/provider";

const bungee = Bungee({ subsets: ["latin"], weight: ['400'] });

export default function SearchPage({ searchParams }) {
  const { clearSearchText } = useSearch();
  const [searchResults, setSearchResults] = useState([]);
  const searchText = searchParams.query;
  const IMAGE_PATH500 = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    async function handleSearchResults(query) {
      const searchResults = await getSearchRequest(query);
      setSearchResults(searchResults);
    }

    handleSearchResults(searchParams.query);
  }, [searchParams.query]);

  const imgLoader = ({src}) => {
    return `${IMAGE_PATH500}${src}`
  }

  return (
    <>
      <main className="max-w-[1140px] m-[100px_auto] px-[20px] flex flex-col gap-[40px]">
        <div className="flex gap-[40px] flex-col">
          {searchResults.length > 0 ? (
            <>
              <h2 className="text-[30px] text-[white]">
                <span className={bungee.className}>
                  Resultados para {`"${searchText}"`}
                </span>
              </h2>
              <div className="flex flex-wrap gap-[0.3vw]">
                {searchResults.map((searchResult, index) => (
                  searchResult.profile_path || searchResult.poster_path ? (
                    <div key={index} className="flex relative group/searchInfo">
                      <Link onClick={clearSearchText} href={`/${searchResult.media_type === 'tv' ? 'series' : searchResult.media_type === 'movie' ? 'filmes' : 'atores'}/${searchResult.id}`}> 
                        <Image loader={imgLoader} className="flex w-[200px] h-[300px] rounded-[0.2vw]" src={`${IMAGE_PATH500}${searchResult.poster_path || searchResult.profile_path}`} alt={searchResult.title || searchResult.name} width="200" height="300"/>
                        <div className="[transition:all_0.3s_ease_0s] w-full h-full absolute top-0 left-0 opacity-[0] group-hover/searchInfo:opacity-100 bg-[linear-gradient(to_top,_rgb(0,_0,_0)_12%,_rgba(0,_0,_0,_0))] rounded-[0.2vw]"></div>
                        <div className="text-center font-bold p-[0_10px_20px] flex justify-center items-center absolute bottom-[-20px] group-hover/searchInfo:bottom-[0px] [transition:all_0.3s_ease_0s] opacity-[0] group-hover/searchInfo:opacity-100 w-full h-max">
                          <p className={bungee.className}>{searchResult.title || searchResult.name}</p>
                        </div>
                      </Link>
                    </div>
                  ) : null
                ))}
              </div>
            </>
          ) : (
            <h2 className="text-[30px] text-[white]">
              <span className={bungee.className}>
                Nenhum Resultado para {`"${searchText}"`}
              </span>
            </h2>
          )}
        </div>
      </main>
    </>
  )
}