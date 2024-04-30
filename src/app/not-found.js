"use client"
import Link from "next/link";
import { TbError404 } from "react-icons/tb";
import { Bungee } from "next/font/google";
import { useEffect } from "react";

const bungee = Bungee({ subsets: ["latin"], weight: ['400'] });

export default function NotFound() {
  useEffect(() => {
    document.title = `Página não encontrada - Cine World`;
  }, []); 

  return(
    <div className="w-full h-[90svh] flex items-center justify-center text-[30px] flex-col text-center">
      <TbError404 size={54} className="text-primary-color"/>
      <span className={bungee.className}>OPS! NÃO ENCONTRAMOS ESSA PÁGINA!</span>
      <span className={bungee.className}>IR PARA A <Link href={'/'} className="text-primary-color underline"> PÁGINA PRINCIPAL</Link></span>
    </div>
  )
}