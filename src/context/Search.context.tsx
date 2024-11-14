import React, { createContext, useState, ReactNode, useContext } from 'react';

// Định nghĩa kiểu dữ liệu cho context
interface SearchProps {
  searchText: string;
  searchData: any;  
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setSearchData: React.Dispatch<React.SetStateAction<any>>;
}

// Tạo context với giá trị mặc định là undefined
export const SearchResultContext = createContext<SearchProps | undefined>(undefined);

// Tạo provider để bao bọc các component
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchData, setSearchData] = useState<any>(null);  

  // Cung cấp giá trị context cho các component con
  const value = { searchText, searchData, setSearchText, setSearchData };

  return (
    <SearchResultContext.Provider value={value}>
      {children}
    </SearchResultContext.Provider>
  );
};
