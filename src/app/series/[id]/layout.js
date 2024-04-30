"use client"
import { useEffect } from 'react';

export default function SeriesLayout({ children, serieDetails }) {
  useEffect(() => {
    if (serieDetails) {
      document.title = `${serieDetails} - Cine World`;
    }
  }, [serieDetails]); 

  return (
    <>
      {children}
    </> 
  ); 
}
