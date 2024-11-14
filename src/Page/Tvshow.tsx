import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ListMovie } from '../component/ListMovie';
export const Tvshow = () => {
  const [page,setPage] = useState<number>(1)
    const fetchTvShow = async (page:number) => {
        try {
            const respon = await axios.get(
                `https://api.themoviedb.org/3/tv/popular?api_key=65246668c09137cf608275dca4806b51&language=en-US&page=${page}`
            );
            return respon.data.results;
        } catch (error) {
            alert(error);
        }
    };

    const { data } = useQuery({
        queryKey: ['tv-show',page],
        placeholderData:true,
        queryFn: () => fetchTvShow(page),
        staleTime:10000
    });

    return (
        <div className="px-14">
            <ListMovie listMovie={data} />
            <div className="text-center space-x-3 py-6">
                <button
                    disabled={page === 1 ? true : false}
                    className="bg-gradient-to-r from-orange-500 to-purple-700 py-2 px-3 rounded-xl hover:scale-110 transition-all"
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    Trang trước
                </button>
                <span>{page}</span>
                <button
                    className="bg-gradient-to-r from-orange-500 to-purple-700 py-2 px-3 rounded-xl hover:scale-110 transition-all"
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
};
