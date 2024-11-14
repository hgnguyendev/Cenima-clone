import React from 'react';
import { Banner } from '../component/Banner/Banner';
import { ContainerList } from '../component/ContainerMovie';
import axios from 'axios';
import { useQueries, useQuery } from '@tanstack/react-query';
export const Action = () => {
  const fetchApi = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=65246668c09137cf608275dca4806b51&language=vi-US&page=1');
    return response.data.results;
  };
  const fetApiPopular = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=65246668c09137cf608275dca4806b51&language=vi-US&page=2')
    return response.data.results
  }

  const queries = useQueries({
    queries: [
      {
        queryKey:['movie'],
        queryFn:fetchApi
      },
      {
        queryKey:['popular'],
        queryFn:fetApiPopular
      }
    ]
  })
  const [movieQuery,popularQuery] = queries
  
  return (
    <div>
      <div><Banner /></div>
     <div className='space-y-5'>
        <ContainerList title='Phim mới' movies={movieQuery.data} />
        <ContainerList title='Phim chiếu rạp' movies={popularQuery.data} />
        {/* <ContainerList title='Phim mới' movies={movieQuery.data} /> */}
     </div>
    </div>
  );
};
