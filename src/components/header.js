"use client"
import { Bungee } from "next/font/google";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { IoEarth } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSearch } from "./provider";

const bungee = Bungee({ subsets: ["latin"], weight: ['400'] });

export default function Header({  }) {
  const { searchText, setSearchText, clearSearchText, isInputVisible, setInputVisible } = useSearch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePage, setActivePage] = useState(false);
  const searchInputRef = useRef(null);
  const router = useRouter();
  const pathName = usePathname();
  
  function handleChange(e) {
    setSearchText(e.target.value);
  }

  function handleExpandInput() {
    setInputVisible(!isInputVisible);
    if (!isInputVisible) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 0);
    }
  }

  {/*function closeSearch() {
    setSearchText('');
    
    if (pathName.includes('/search')) {
      router.back();
    }
  }*/}

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  function handleSearch() {
    if (searchText.trim() === '') {
      searchInputRef.current.focus();
      return;
    }

    if (!pathName.includes('/search')) {
      router.push(`/search?query=${searchText}`);
    } else if (pathName.includes('/search')) {
      router.replace(`/search?query=${searchText}`);
    }
  }

  useEffect(() => {
    if (!pathName.includes('/search')) {
      setInputVisible(false);
      setSearchText('');
    }

    if (pathName.includes('/filmes')) {
      setActivePage('filmes');
    } else if (pathName.includes('/series')) {
      setActivePage('series');
    } else {
      setActivePage(null);
    }

    {/*if (pathName.includes('/search')) {
      setSearchText(searchParamsText);
      setInputVisible(true)
    }*/}

    function handleScroll() {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathName, setSearchText, setInputVisible]);

  return (     
    <header className={`w-full min-h-[70px] flex bg-[linear-gradient(180deg,rgba(0,0,0,0.7)_10%,transparent)] items-center px-[3%] text-white justify-between fixed z-[30] top-0`}
    style={{ backgroundColor: isScrolled ? '#141414' : 'transparent', transition: 'background-color 300ms' }}>
      <div className="flex items-center gap-[30px] text-white">
        <Link onClick={clearSearchText} href="/" className="text-white text-[24px] cursor-pointer font-[bungee] flex items-center gap-[5px] select-none" title="Cine World">
          <span className={bungee.className}>Cine</span>
          <IoEarth className="text-[30px] text-[#ff0000]"/>
        </Link>
      </div>
      <div className="flex items-center text-[15px] gap-[15px]">
      <ul className="flex items-center text-white gap-[10px] text-[15px]">
          <li>
            <Link onClick={clearSearchText} href="/filmes">
              <span className={activePage === 'filmes' ? 'nav-active' : 'nav-link'}>Filmes</span>
            </Link>
          </li>
          <li>
            <Link onClick={clearSearchText} href="/series">
              <span className={activePage === 'series' ? 'nav-active' : 'nav-link'}>Séries</span>
            </Link>
          </li>
        </ul>
        <div className="flex items-center justify-end rounded-[3px] [transition-[200ms]] pr-[5px]" style={{ border: isInputVisible ? '1px solid white' : '1px solid transparent', width: isInputVisible ? '100%' : 'min-content' }}>
          <input ref={searchInputRef} type="text" name="inputSearch" className="text-[white] p-[6px_10px_6px_10px] bg-[transparent] outline-none font-normal w-[0%] placeholder:text-[#d8d8d8] placeholder:select-none" value={searchText} onKeyDown={handleKeyDown} onChange={handleChange} placeholder="Filmes, Séries e Atores" style={{ width: isInputVisible ? '100%' : '0%', transition: '200ms', padding: isInputVisible ? '6px 10px 6px 10px' : '0px' }}/>
          <IoSearchOutline className="text-[28px] cursor-pointer min-w-[28px] select-none" onClick={isInputVisible ? handleSearch : handleExpandInput}/>
        </div>
        {/*<div className="flex items-center justify-end rounded-[3px] pr-[5px] [transition-[200ms]]" style={{ border: isInputVisible ? '1px solid white' : '0', marginRight: isInputVisible ? '20px' : '20px' }}>
          <input ref={searchInputRef} type="text" name="inputSearch" className="text-[white] p-[6px_10px_6px_10px] bg-[transparent] outline-none font-normal w-[0%] placeholder:text-[#d8d8d8] placeholder:select-none" value={searchText} onChange={handleChange} placeholder="Filmes, Séries e Atores" style={{ width: isInputVisible ? '100%' : '0%', transition: '200ms' }} onKeyUp={handleSearch}/>
          {isInputVisible ? <IoCloseOutline className="text-[28px] cursor-pointer min-w-[28px] select-none" onClick={() => { handleExpandInput(); closeSearch(); }}/> : <IoSearchOutline className="text-[28px] cursor-pointer min-w-[28px] select-none" onClick={handleExpandInput}/>}
        </div>*/}
        {/*<Link onClick={clearInputText} href="/cadastro">
          <span className="p-[7px_20px] bg-primary-color rounded-[5px] flex hover:bg-[#951717bd] [transition:200ms] select-none">Login</span>
        </Link>*/}
      </div>
    </header>
  )
}