import React, { createContext, useState, useContext, useCallback } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQueryState] = useState('');

  const setSearchQuery = useCallback((query) => {
    setSearchQueryState(query);
  }, []);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};