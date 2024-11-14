import React, { useContext } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ListMovie } from './ListMovie';
import { SearchResultContext } from '../context/Search.context';

export const SearchList = () => {
 
  const context = useContext(SearchResultContext);

  
  if (!context) {
    throw new Error('SearchResultContext must be used within a SearchProvider');
  }

  const { searchText } = context;

  
  const fetchSearch = async (input: string) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${input}&include_adult=false&language=vi-VN&api_key=65246668c09137cf608275dca4806b51`);
      return response.data.results; 
    } catch (error) {
      alert('Có lỗi xảy ra khi tải dữ liệu: ' + error);
     
    }
  };

 
  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', searchText], 
    enabled: !!searchText, 
    queryFn: () => fetchSearch(searchText), 
  });

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (isError) {
    return <div>Đã xảy ra lỗi khi tải dữ liệu.</div>;
  }
   
  return (
    <div>
      {data && data.length > 0 ? (
        <ListMovie listMovie={data} /> 
      ) : (
        <div>Không có kết quả tìm kiếm.</div>
      )}
    </div>
  );
};
