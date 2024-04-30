"use client"
import { Bungee } from "next/font/google";
import { useEffect, useState } from "react";
import ActorLayout from "./layout";
import { getActorDetails, getActorMovies } from "@/lib/movieRequests";
import Image from "next/image";
import Slider from "@/components/slider";
import { TbError404 } from "react-icons/tb";
import { RiMapPin2Line } from "react-icons/ri";
import Link from "next/link";

const bungee = Bungee({ subsets: ["latin"], weight: ['400'] });

export default function ActorPage({params}) {
  const [actorDetails, setActorDetails] = useState([]);
  const [actorMovies, setActorMovies] = useState([]);
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function handleActorDetails(id) { 
      const actorDetails = await getActorDetails(id); 

      if (!actorDetails || actorDetails.error || actorDetails.name === undefined) { 
        setNotFound(true);
        return; 
      }

      setActorDetails(actorDetails);

      setActorMovies(await getActorMovies(id));
    }

    handleActorDetails(params.id); 
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

  const imgLoader = ({src}) => {
    return `${IMAGE_PATH}${src}`
  }

  return (
    <ActorLayout actorDetails={actorDetails.name ? actorDetails.name : 'Página não encontrada - Cine World'}>
      <main className="max-w-[1240px] m-[100px_auto] px-[20px] flex flex-col gap-[40px]">
        <div className="flex gap-[40px] justify-center">
          <Image priority={true} width="300" height="500" loader={imgLoader} src={`${IMAGE_PATH}${actorDetails.profile_path}`} alt={`Filme ${actorDetails.name}`} className="rounded-[10px] h-[500px] object-cover"/>
          <div className="overflow-x-hidden flex flex-col gap-[20px]">
            <h2 className="text-[40px] text-[white]">
              <span className={bungee.className}>
                {actorDetails.name}
              </span>   
            </h2>
            {actorDetails.place_of_birth && <p className="flex gap-[5px] items-baseline"><RiMapPin2Line size={21}/>{actorDetails.place_of_birth}</p>}
            {actorDetails.biography && <p className="line-clamp-[10]">{actorDetails.biography}</p>}
            <Slider mediaType={'filmes'} medias={actorMovies} title={'Filmes e Séries'}/>
          </div>
        </div>
      </main>
    </ActorLayout>
  )
}