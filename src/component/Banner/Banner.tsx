import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../../asset/anh-spider-man-24-17-13-47-44.jpg';
import './banner.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FaRegPlayCircle } from 'react-icons/fa';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import axios from 'axios';
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useQuery } from '@tanstack/react-query';
import { MdStar } from 'react-icons/md';
import { useContext, useEffect, useState } from 'react';
import { GenresContext } from '../context/General';
import { ModalContainer } from '../ModalContainer';
export interface Movie {
    id: number;
    title: string;
    backdrop_path: string;
    vote_average: number;
}
export const Banner = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState<Movie | null>(null);
    const [trailerKey, setTrailerKey] = useState<string | undefined>(undefined);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const { genres, setGenres } = useContext(GenresContext);
    const fetchApi = async () => {
        try {
            const response = await axios.get(
                'https://api.themoviedb.org/3/movie/top_rated?api_key=65246668c09137cf608275dca4806b51&language=vi-VN&page=1'
            );
            return response.data.results;
        } catch (error) {
            alert(error);
        }
    };
    const { data } = useQuery<Movie[]>({
        queryKey: ['movie'],
        queryFn: fetchApi,
        staleTime: 10000,
        retry: 2,
    });
    useEffect(() => {
        if(selectedMovieId !== null) {
            fetch(
                `https://api.themoviedb.org/3/movie/${selectedMovieId}/videos?api_key=65246668c09137cf608275dca4806b51`
            )
                .then((res) => res.json())
                .then((res) => {
                    setTrailerKey(res.results[0]?.key);
                });
                const selectedMovie = data?.find(
                    (item) => item.id === selectedMovieId
                );
                if (selectedMovie) {
                    setValue(selectedMovie);
                }

        }
    }, [selectedMovieId, data])
    function handleOnClick(id: number): void {
        setIsOpen(true);
        setSelectedMovieId(id);
    }
    function closeModal() {
        setIsOpen(false);
        setSelectedMovieId(null);
    }
    return (
        <div className="px-16 space-y-2 lg:block hidden">
            <div>
                <h1 className="text-2xl font-semibold pt-3 uppercase">
                    Phim đề cử
                </h1>
            </div>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 1,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                className="movieSwiper"
                loop={true}
                modules={[EffectCoverflow, Autoplay]}
            >
                {data?.map((item) => (
                    <SwiperSlide
                        key={item.id}
                        className="relative group overflow-hidden transition-all"
                    >
                        <div
                            className="relative group bg-center bg-no-repeat delay-100 ease-in duration-300 hover:blur-sm  bg-cover h-[100%] px-2 py-3 hover:scale-110 cursor-pointer"
                            style={{
                                backgroundImage: `url('https://image.tmdb.org/t/p/w1280${item.backdrop_path}')`,
                            }}
                        >
                            <h4 className="absolute bottom-0 text-lg left-[50%] translate-x-[-50%] text-center bg-gradient-to-r from-black to-orange-900 w-full py-2 overflow-clip whitespace-nowrap overflow-ellipsis px-5">
                                {item.title}
                            </h4>
                            <div className="w-[50px]">
                                <CircularProgressbarWithChildren
                                    value={item.vote_average * 10}
                                    strokeWidth={6}
                                    styles={buildStyles({
                                        pathColor: 'rgb(251 146 60)',
                                        textColor: 'white',
                                    })}
                                >
                                    <div className="flex items-center">
                                        <span className="text-orange-500 font-medium">
                                            {item.vote_average.toFixed(1)}
                                        </span>
                                        <MdStar className="text-yellow-400" />
                                    </div>
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                        <FaRegPlayCircle
                            className="absolute left-[50%] translate-x-[-50%] duration-500  bottom-[-60px] text-6xl cursor-pointer group-hover:bottom-[110px]  hover:text-red-400"
                            onClick={() => handleOnClick(item.id)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <ModalContainer
                close={closeModal}
                open={modalIsOpen}
                trailerMovie={trailerKey}
                data={value}
            />
        </div>
    );
};
