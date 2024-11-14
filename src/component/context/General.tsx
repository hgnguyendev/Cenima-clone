import React, { createContext, useState } from 'react';

// Tạo context
export const GenresContext = createContext<{
    genres: number | null;
    setGenres: (data: number) => void;
}>({
    genres: null,
    setGenres: () => {},
});

// Tạo provider
export const GenresProvider = ({ children }: { children: React.ReactNode }) => {
    const [genres, setGenres] = useState<number | null>(null);
    const value = { genres, setGenres };
    return (
        <GenresContext.Provider value={value}>
            {children}
        </GenresContext.Provider>
    );
};
