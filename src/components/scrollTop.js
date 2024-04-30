"use client"
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollTop() {
  const pathname = usePathname()
    
  useEffect(() => {
    window.scroll(0, 0)
  }, [pathname])
};
