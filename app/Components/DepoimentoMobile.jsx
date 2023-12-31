import React from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { GoogleReview } from '.'
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const DepoimentoMobile = ({ depoimento }) => {
    return (
        <div className="flex flex-col items-start justify-start gap-4 bg-white rounded-xl shadow-2xl p-8 text-center min-w-[80vw] w-full min-h-[250px] relative basis-1/3 card-shadow">
            <img
                src={depoimento.profile_photo_url}
                alt={depoimento.author_name}
                className="rounded-ful w-16 absolute top-[-18px] drop-shadow-xl pointer-events-none"
            ></img>
            <span className="font-bold text-xl  mt-4 self-center text-center">
                {depoimento.author_name.charAt(0).toUpperCase() +
                    depoimento.author_name.slice(1)}{' '}
            </span>
            <p className="my-auto text-start font-medium text-md font-inter drop-shadow-[0px_0px_1px_rgba(0,0,0,0.4)] z-10">
                {depoimento.text}
            </p>

            <div className="text-[#f8be00] flex items-center absolute top-[8px] left-[50%] -translate-x-1/2">
                {[...Array(5)].map((star, index) => (
                    <span key={index}>
                        {depoimento.rating >= index + 1 ? (
                            <AiFillStar className="text-[#f8be00]" />
                        ) : (
                            <AiOutlineStar className="text-[#f8be00]" />
                        )}
                    </span>
                ))}
            </div>
            <div className="absolute bottom-6 right-6 ">
                <FaQuoteRight className="text-[#a0a0a0c0] text-6xl -z-10" />
            </div>
        </div>
    )
}

export default DepoimentoMobile
