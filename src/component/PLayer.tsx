import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Players = () => {
  const { playId } = useParams<{ playId: string }>();
  
  const [loading, setLoading] = useState(true);

  if (!playId) {
    return <div>Không tìm thấy video.</div>;
  }
  

  const movieURL = `https://vidsrc.xyz/embed/movie/${playId}`;

  const handleLoad = () => {
    setLoading(false);
  };
 

  return (
    <div className="relative w-full h-screen">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="text-white text-xl">Đang tải video...</div>
        </div>
      )}

      <iframe
        title="Video Player"
        className="w-full h-full"
        src={movieURL}
        allowFullScreen
        frameBorder="0"
        onLoad={handleLoad} // Khi iframe tải xong, gọi handleLoad
      ></iframe>
    </div>
  );
};
