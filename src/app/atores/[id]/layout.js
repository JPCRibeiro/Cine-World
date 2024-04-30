"use client"
import { useEffect } from 'react';

export default function ActorLayout({ children, actorDetails }) {
  useEffect(() => {
    if (actorDetails) {
      document.title = `${actorDetails} - Cine World`;
    }
  }, [actorDetails]); 

  return (
    <>
      {children}
    </> 
  ); 
}
