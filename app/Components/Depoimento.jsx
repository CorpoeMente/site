import React from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import Image from 'next/image'
import { FaQuoteRight } from 'react-icons/fa'

const Depoimento = ({ depoimento, index }) => {
    return (
        <div
            className={`flex flex-col items-start justify-start gap-4 bg-white rounded-xl card-shadow p-8 text-center min-w-[380px] max-h-[250px] min-h-[250px] z-10 relative basis-1/3 ${
                index == 0 ? 'me-[10%]' : ''
            } ${index == 1 ? 'ms-[10%]' : ''}
            ${index == 2 ? 'me-[5%] mt-32' : ''}
            ${index == 3 ? 'ms-[5%] mt-32' : ''}`}
        >
            <Image
                src={depoimento.profile_photo_url}
                alt={depoimento.author_name}
                className="rounded-ful w-16 absolute top-[-18px] drop-shadow-xl pointer-events-none"
                width={64}
                height={64}
                lazy="true"
            />
            <span className="font-bold text-xl  mt-4 self-center text-center capitalize">
                {depoimento.author_name}
            </span>
            <p className="my-auto text-start font-medium text-lg font-inter drop-shadow-[0px_0px_1px_rgba(0,0,0,0.2)] z-10 line-clamp-4 nowrap">
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
            <div className="absolute bottom-6 right-6">
                <FaQuoteRight className="text-[#a0a0a0c0] text-6xl -z-10" />
            </div>
        </div>
    )
}

export default Depoimento
