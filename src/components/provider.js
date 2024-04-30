"use client"
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function useSearch() {
  return useContext(SearchContext);
}

export const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  const [isInputVisible, setInputVisible] = useState(false);

  const clearSearchText = () => {
    setSearchText('');
    setInputVisible(false);
  };

  return (
    <SearchContext.Provider value={{ searchText, setSearchText, clearSearchText, isInputVisible, setInputVisible  }}>
      {children}
    </SearchContext.Provider>
  );
};