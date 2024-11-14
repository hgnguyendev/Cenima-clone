import YouTube from 'react-youtube';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { IoTimeOutline } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { Movie } from './ListMovie';
interface Props {
    trailer: string | undefined;
    data: Movie | null;
}
const iconStar = [
    {
        id: 1,
        icon: <FaStar />,
    },
    {
        id: 2,
        icon: <FaStar />,
    },
    {
        id: 3,
        icon: <FaStar />,
    },
    {
        id: 4,
        icon: <FaStar />,
    },
    {
        id: 5,
        icon: <FaStar />,
    },
];
export const ListModal = ({ trailer, data }: Props) => {
    const navigate = useNavigate()
    const [color, setColor] = useState(0);
    const opts = {
        height: '340',
        width: '740',
        playerVars: {
            autoplay: 1,
        },
    };
    const handleClick = (index: number) => {
        setColor(index + 1);
    };
    return (
        <div className="p-3">
            <div className="flex space-x-2">
                <div
                    className="w-[270px] bg-no-repeat bg-cover bg-center pt-[30%] rounded-md relative"
                    style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/w500${data?.backdrop_path}')`,
                    }}
                >
                    <button className="uppercase bg-black  absolute bottom-0 w-[200px] left-[50%] translate-x-[-50%] mb-3 py-3 rounded-lg font-semibold hover:opacity-[0.8]" onClick={() => navigate(`/player/${data?.id}`)}>
                        Xem Phim
                    </button>
                </div>

                <div className="w-full flex-1 space-y-2">
                    <div className="h-[100px] space-y-1 pl-2">
                        <h1 className="text-4xl font-bold uppercase italic">
                            {data?.title || data?.name}
                        </h1>
                        <div className="flex items-center space-x-1">
                            <IoTimeOutline />
                            <p>{data?.release_date || data?.first_air_date}</p>
                        </div>

                        <div className="flex items-center text-2xl space-x-1 cursor-pointer">
                            {iconStar.map((star, index) => (
                                <div
                                    key={star.id}
                                    className={`text-xl overflow-hidden ${
                                        color > index
                                            ? 'text-yellow-500'
                                            : 'text-gray-300'
                                    }`}
                                    onClick={() => handleClick(index)}
                                >
                                    {star.icon}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-[340px]">
                        {trailer && <YouTube videoId={trailer} opts={opts} />}
                    </div>
                </div>
            </div>

            <div className="border border-gray-500 rounded-md h-[168px] mt-2 p-2 overflow-y-auto">
                <div className="">
                    <h4>Nội dung: </h4>
                    <p>{data?.overview || 'No overview available'}</p>
                </div>
            </div>
        </div>
    );
};
