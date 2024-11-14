import axios from 'axios';
import { ListMovie } from '../component/ListMovie';
import movieList from '../Data/dataMovie';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
interface Props {
    id:number,
    page:number
}

export const Movies = () => {
    const [idMovie, setIdMovie] = useState<number>(28);
    const [id, setId] = useState<number>(28);
    const [page,setPage] = useState<number>(1)

    const [name, setName] = useState<string>('Hành Động');

    const fetchMovie = async (page: number, idMovie: number) => {
        try {
            const respon = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=65246668c09137cf608275dca4806b51&include_adult=false&include_video=false&language=vi-VN&page=${page}&sort_by=popularity.desc&with_genres=${id}`
            );
            return respon.data.results;
        } catch (error) {
            alert(error);
        }
    };
    const { data } = useQuery({
        queryKey: ['movie',page, idMovie],
        queryFn: () => fetchMovie(page,idMovie),
        placeholderData:true,
        refetchInterval:500,
        enabled: !!idMovie,
        staleTime: 10000,
    });

    const handleMovie = (id: number) => {
        setIdMovie(id);
        setId(id);
        setPage(1)
        const movieId = movieList.find((item) => {
            if (id === item.id) {
                setName(item.name);
            }
        });
        return movieId;
    };
    return (
        <div className="px-14">
            <div className="text-center">
                {movieList.map((item) => (
                    <button
                        onClick={() => handleMovie(item.id)}
                        key={item.id}
                        className={`border border-gray-400 rounded-lg text-sm px-2 py-2 mx-2 my-2  transition-all hover:text-white hover:scale-110 ${
                            id === item.id ? 'border border-orange-500' : null
                        }`}
                    >
                        {item.name}
                    </button>
                ))}
            </div>

            <div className=" ">
                <h1 className="text-2xl font-semibold pt-3 uppercase mb-3">
                    {name}
                </h1>
                <ListMovie listMovie={data} />
                <div className="py-10 text-center space-x-5">
                    <button disabled={page === 1 ? true :false} className='bg-gradient-to-r from-orange-500 to-purple-700 py-2 px-3 rounded-xl hover:scale-110 transition-all' onClick={() => setPage(prev => prev - 1)}>Trang trước</button>
                    <span>{page}</span>
                    <button className='bg-gradient-to-r from-orange-500 to-purple-700 py-2 px-3 rounded-xl hover:scale-110 transition-all' onClick={() => setPage(prev => prev + 1)}>Trang sau</button>
                </div>
            </div>
        </div>
    );
};
