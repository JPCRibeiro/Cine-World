import Image from "next/image";
import { Bungee } from "next/font/google";
import { RiMovieLine, RiCalendarLine, RiTimeLine } from "react-icons/ri";
import Slider from "./slider";
import { format } from "date-fns";

const bungee = Bungee({ subsets: ["latin"], weight: ['400'] });

export default function MediaDetails({ mediasDetails, genres, mediasElenco }) {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  function imgLoader({src}) {
    return `${IMAGE_PATH}${src}`
  }
  
  return(
    <>
      <div className="flex gap-[40px] justify-center">
        <Image priority={true} width="333" height="500" loader={imgLoader} src={`${IMAGE_PATH}${mediasDetails.poster_path}`} alt={`${mediasDetails.title || mediasDetails.name}`} className="rounded-[10px] h-[500px] w-[auto] object-cover"/>
        <div className="flex flex-col gap-[20px] overflow-hidden">
          <div>
            <h2 className="text-[34px] text-[white]">
              <span className={bungee.className}>
                {mediasDetails.title || mediasDetails.name} 
              </span>
            </h2>
            {mediasDetails.tagline && <p className="italic">{mediasDetails.tagline}</p>}  
          </div>
          <div className="flex gap-[20px]">
            {mediasDetails.release_date || mediasDetails.first_air_date ? (
              <div className="flex items-center gap-[5px]">
                <RiCalendarLine size={18} className="mt-[1px]"/>{format(new Date(mediasDetails.release_date || mediasDetails.first_air_date), 'dd/MM/yyyy')}
              </div>
            ) : null}
            {mediasDetails.runtime !== undefined && mediasDetails.runtime !== 0 ? (
              <div className="flex items-center gap-[5px]">
                <RiTimeLine  size={20}/>{`${Math.floor(mediasDetails.runtime / 60)}h ${Math.floor(mediasDetails.runtime % 60)}min`}
              </div>
            ) : null}
            {mediasDetails.number_of_seasons !== undefined && mediasDetails.number_of_seasons !== 0 ? (
              <div className="flex items-center gap-[5px]">
                <RiMovieLine size={19}/>{mediasDetails.number_of_seasons === 1 ? `${mediasDetails.number_of_seasons} temporada` : `${mediasDetails.number_of_seasons} temporadas`}
              </div>
            ) : null}
          </div>
          {genres && (
            <div className="flex gap-[10px] flex-wrap">
            {genres.map((genre, index) => (
              <div key={index} className="select-none p-[5px_15px] text-[white] rounded-[5px] w-fit text-[14px] font-[600] bg-[#535050e0]">
                {genre.name}
              </div>
            ))}
          </div>
          )}
          {mediasDetails.overview && <p>{mediasDetails.overview}</p>}
          <Slider mediaType={'atores'} medias={mediasElenco} title={'Elenco'}/>
        </div>
      </div>
    </>
  )
}