import Image from "next/image";
import Link from "next/link";
import { Bungee } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { IoChevronBackSharp, IoChevronForwardSharp  } from "react-icons/io5";

const bungee = Bungee({ subsets: ["latin"], weight: ['400'] });

export default function Slider({ medias, title, mediaType }) {
  const sliderRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [scrollbarPosition, setScrollbarPosition] = useState(0);
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  function handleLeftBtn() {
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth / 1.060;
      sliderRef.current.scrollLeft -= width;
    }
  }
  
  function handleRightBtn() {
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth / 1.060;
      sliderRef.current.scrollLeft += width;
    }
  }
  
  function updateScrollbar() {
    const box = sliderRef.current;
    const ratio = box.clientWidth / box.scrollWidth;
    const newWidth = ratio * box.clientWidth;
    const newPosition = (box.scrollLeft / box.scrollWidth) * box.clientWidth;
  
    setScrollbarWidth(newWidth);
    setScrollbarPosition(newPosition);
  }

  function imgLoader({src}) {
    return `${IMAGE_PATH}${src}`
  }

  useEffect(() => {
    const box = sliderRef.current;

    if (box) {
      function handleScroll() {
        setScrollPosition(box.scrollLeft);
        updateScrollbar();
      };
  
      box.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', updateScrollbar);
  
      return () => {
        if (box) {
          box.removeEventListener('scroll', handleScroll);
        }
        window.removeEventListener('resize', updateScrollbar);
      };
    }
  }, [medias]);

  return (
    <>
      {medias && medias.length > 0 && (
          <div className="flex flex-col gap-[30px]">
            <h2 className="relative text-[30px] w-fit before:content-[''] before:bg-primary-color before:absolute before:w-full before:h-[5px] before:bottom-0">
              <span className={bungee.className}>
                {title}
              </span>
            </h2>
            <div className="relative flex group/show">
              <div onClick={handleLeftBtn} className={`hover:bg-[hsla(0,0%,8%,0.7)] bg-[hsla(0,0%,8%,0.4)] bottom-0 left-0 text-[#fff] absolute flex justify-center text-center top-0 z-20 group/scale cursor-pointer ${scrollPosition === 0 ? 'hidden' : 'flex'}`}>
                <IoChevronBackSharp className="self-center text-[40px] h-auto [transition:transform_.1s_ease-out_0s] hidden group-hover/show:block group-hover/scale:scale-125"/>
              </div>
              <div className="overflow-x-hidden relative">
                <div ref={sliderRef} className="flex rounded-[0.2vw] w-full h-full overflow-x-scroll overflow-y-hidden gap-[0.3vw] scroll-smooth scrollbar-hide no-scrollbar relative">
                  {medias.map((media, index) => (
                    (mediaType === 'atores' && media.profile_path && media.known_for_department === "Acting") || (media.poster_path) ? (
                      <div key={index} className={`relative group/movieInfo h-full flex-shrink-0 ${mediaType === 'atores' ? 'h-[200px] w-[140px]' : 'h-[300px] w-[200px]'}`}>
                        <Link href={`/${mediaType}/${media.id}`} className={`flex relative ${mediaType === 'atores' ? 'w-[140px]' : 'w-[200px]'}`}>
                          <div className="relative">
                            <Image 
                              loader={imgLoader} 
                              className={`object-cover rounded-[0.2vw] ${mediaType === 'atores' ? 'h-[200px] w-[140px]' : 'h-[300px] w-[200px]'}`} 
                              src={`${IMAGE_PATH}${mediaType === 'atores' ? media.profile_path : media.poster_path}`} 
                              alt={media.name || media.title}
                              width={mediaType === 'atores' ? 150 : 200} 
                              height={mediaType === 'atores' ? 180 : 300}
                            />
                            <div className="[transition:all_0.3s_ease_0s] w-full h-full absolute top-0 left-0 opacity-[0] group-hover/movieInfo:opacity-100 bg-[linear-gradient(to_top,_rgb(0,_0,_0)_12%,_rgba(0,_0,_0,_0))] rounded-[0.2vw]"></div>
                            <div className="text-center font-bold p-[0_10px_20px] flex justify-center items-center absolute bottom-[-20px] group-hover/movieInfo:bottom-[0px] [transition:all_0.3s_ease_0s] opacity-[0] group-hover/movieInfo:opacity-100 w-full h-max">
                              <p className={bungee.className}>{media.title || media.name}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ) : null
                  ))}
                </div>
              </div>
              <div onClick={handleRightBtn} className={`hover:bg-[hsla(0,0%,8%,0.7)] bg-[hsla(0,0%,8%,0.4)] bottom-0 right-0 top-0 text-[#fff] absolute flex justify-center text-center z-20 group/scale cursor-pointer ${scrollPosition === sliderRef.current?.scrollWidth - sliderRef.current?.clientWidth ? 'hidden' : 'flex'}`}>
                <IoChevronForwardSharp className="self-center text-[40px] h-auto [transition:transform_.1s_ease-out_0s] hidden group-hover/show:block group-hover/scale:scale-125"/>
              </div>
            </div>
          </div>
      )}
    </>
  )
}
