import React, { useContext } from 'react';
import { NavMenu } from '../component/NavMenu';
import { SearchResultContext } from '../context/Search.context';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLightbulb } from "react-icons/md";
export const Header = () => {
    const navigate = useNavigate();
    const context = useContext(SearchResultContext);

    if (!context) {
        throw new Error('context khong hop le');
    }

    const { searchText, setSearchText } = context;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        navigate(`/search/${e.target.value}`);

        if (e.target.value.length === 0) {
            navigate('/');
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/search/${searchText}`);
    };

    return (
        <div className="flex justify-between items-center  px-14 border-b border-gray-700 fixed top-0 left-0 right-0 z-10 bg-black py-2 lg:py-0 sm:py-1">
            <a href="/">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-700 font-bold text-[20px] uppercase italic cursor-pointer lg:text-[40px] sm:text-[30px] md:text-[30px] ">
                    th cinema
                </h1>
            </a>
            <div className="flex items-center space-x-5">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-[250px] outline-none bg-transparent border border-gray-400 text-base h-[35px] rounded-md px-2"
                        placeholder="Search"
                        value={searchText}
                        onChange={handleChange}
                    />
                </form>
                <NavMenu />
               
            </div>
        </div>
    );
};
