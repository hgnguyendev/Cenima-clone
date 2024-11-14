import React from 'react';
import Modal from 'react-modal';
import { ListModal } from './ListModal';
import { Movie } from './ListMovie';

interface Props {
    close?: () => void;
    open: boolean;
    trailerMovie?: string | undefined;
    data: Movie | null;
}

export const ModalContainer = ({ close, open, trailerMovie, data }: Props) => {
    return (
        <Modal
            isOpen={open}
            onRequestClose={close}
            className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[80%] md:w-[700px] lg:w-[1000px] max-w-full max-h-full h-[80%] sm:h-[70%] lg:h-[550px] overflow-auto bg-[rgb(7,2,21)] outline-none border border-gray-400 rounded-md"
            contentLabel="Example Modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Overlay màu tối
                },
            }}
        >
            <ListModal trailer={trailerMovie} data={data} />
        </Modal>
    );
};
