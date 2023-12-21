import React from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { GoogleReview } from '.'
import { FaQuoteRight } from 'react-icons/fa'
import { ImageLoading, TextLoading } from '.'

const Depoimento = ({ index }) => {
    return (
        <div
            className={`flex flex-col items-start justify-start gap-4 bg-white rounded-xl card-shadow p-8 text-center min-w-[380px] max-h-[250px] min-h-[250px] z-10 relative basis-1/3 ${
                index == 0 ? 'me-[10%]' : ''
            } ${index == 1 ? 'ms-[10%]' : ''}
            ${index == 2 ? 'me-[5%] mt-32' : ''}
            ${index == 3 ? 'ms-[5%] mt-32' : ''}`}
        >
            <ImageLoading className="rounded-full w-16 h-16 absolute top-[-18px] drop-shadow-xl pointer-events-none opacity-1" />
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 mt-8 self-center"></div>
            <TextLoading />

            <div className="text-[#f8be00] flex items-center absolute top-[8px] left-[50%] -translate-x-1/2">
                {[...Array(5)].map((star, index) => (
                    <span key={index}>
                        <AiOutlineStar className="text-[#f8be00]" />
                    </span>
                ))}
            </div>
            <div className="absolute bottom-6 right-6">
                <FaQuoteRight className="text-[#a0a0a0c0] text-6xl -z-10" />
            </div>
        </div>
    )
}

export default Depoimento
