import { useState, useEffect } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { ModalContainer } from './ModalContainer';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MovieLoading } from './MovieLoaing/MovieLoading';

export interface Movie {
    id?: number;
    title?: string;
    backdrop_path?: string;
    release_date?: string;
    name?: string;
    first_air_date?: string;
    overview?: string;
}

interface Props {
    listMovie: Movie[]; // Danh sách các bộ phim
}

export const ListMovie = ({ listMovie }: Props) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState<Movie | null>(null);
    const [trailerKey, setTrailerKey] = useState<string | undefined>(undefined);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

    useEffect(() => {
        if (selectedMovieId !== null) {
            fetch(
                `https://api.themoviedb.org/3/movie/${selectedMovieId}/videos?api_key=65246668c09137cf608275dca4806b51`
            )
                .then((res) => res.json())
                .then((res) => {
                    setTrailerKey(res.results[0]?.key);
                });

            const selectedMovie = listMovie.find(
                (item) => item.id === selectedMovieId
            );
            if (selectedMovie) {
                setValue(selectedMovie);
            }
        }
    }, [selectedMovieId, listMovie]);

    // Mở modal
    function openModal() {
        setIsOpen(true);
    }
    // Đóng modal
    function closeModal() {
        setIsOpen(false);
        setSelectedMovieId(null);
    }

    const handleClick = (id: number) => {
        setSelectedMovieId(id);
        setIsOpen(true);
    };

    if (!Array.isArray(listMovie) || listMovie.length === 0) {
        return (
            <div className="text-2xl">
                <MovieLoading />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-x-3 gap-y-3 lg:grid-cols-5 md:grid-cols-2 ">
            {listMovie.map((item) => (
                <div key={item.id} className="relative group">
                    <div
                        className="relative h-[300px] rounded-md bg-center bg-no-repeat bg-cover cursor-pointer hover:blur-sm hover:scale-90 transition-transform duration-700"
                        style={{
                            backgroundImage: `url('https://image.tmdb.org/t/p/w500${item.backdrop_path}')`,
                        }}
                    >
                        <div className="absolute bg-gradient-to-r from-black to-orange-600 w-[100px] h-[30px] text-sm rounded-md text-center leading-[30px] top-2 left-2">
                            {item.release_date
                                ? item.release_date
                                : item.first_air_date}
                        </div>
                        <h1 className="absolute bottom-0 p-2 whitespace-nowrap overflow-ellipsis w-[250px] overflow-hidden">
                            {item.title ? item.title : item.name}
                        </h1>
                    </div>
                    <FaPlayCircle
                        onClick={() => handleClick(item.id!)}
                        className="absolute text-5xl scale-0 transition-transform duration-700 group-hover:scale-150 z-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:text-red-400 cursor-pointer"
                    />
                </div>
            ))}

            <ModalContainer
                close={closeModal}
                open={modalIsOpen}
                trailerMovie={trailerKey}
                data={value}
            />
        </div>
    );
};
