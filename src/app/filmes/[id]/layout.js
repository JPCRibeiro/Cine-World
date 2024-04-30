"use client"
import { useEffect } from 'react';

export default function FilmeLayout({ children, movieDetails }) {
  useEffect(() => {
    if (movieDetails) {
      document.title = `${movieDetails} - Cine World`;
    }
  }, [movieDetails]); 

  return (
    <>
      {children}
    </> 
  ); 
}
