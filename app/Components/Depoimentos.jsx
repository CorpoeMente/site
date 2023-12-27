'use client'
import React, { useEffect, useState } from 'react'
import { Contato, Depoimento } from '../Components'
import { useLoadScript } from '@react-google-maps/api'
import { FaStar } from 'react-icons/fa'
import { DepoimentoLoading } from '../Components'
const libraries = ['places']

const Depoimentos = () => {
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(0)
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        libraries,
    })

    useEffect(() => {
        if (isLoaded && !loadError) {
            const mapDiv = document.createElement('div')
            mapDiv.style.display = 'none'
            document.body.appendChild(mapDiv)

            const service = new google.maps.places.PlacesService(mapDiv)
            service.getDetails(
                {
                    placeId: 'ChIJpTOxo44zWpMRmykTswG9dQI',
                    fields: ['reviews', 'rating'],
                },

                (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        setReviews(place.reviews.slice(0, 4))
                        setRating(place.rating)
                    }
                }
            )
            return () => {
                try {
                    document.body.removeChild(mapDiv)
                } catch (e) {}
            }
        }
    }, [isLoaded, loadError])
    return (
        <section
            className="hidden xl:flex flex-col items-center justify-center w-screen  xl:px-[15%] py-[5%] relative h-auto"
            id="depoimentos"
        >
            <img
                alt="Depoimentos"
                src="/depoimentos-background.jpg"
                className="absolute -z-10 top-0 left-0 w-full h-full opacity-[20%] bg-cover object-top object-cover bg-center"
            />
            <div className="grid place-items-center grid-cols-1 w-full max-w-[90vw] sm:!max-w-[1900px]">
                <span className="z-10 text-secondary text-2xl font-bold drop-shadow-2xl drop-shadow-[0_0px_2px_rgba(0,52,8,0.2)] m-[-6px]">
                    Depoimentos
                </span>
                <h2 className="z-10 text-primary text-4xl font-bold drop-shadow-[0_0px_3px_rgba(89,182,222,0.2)]">
                    Oque Nosso Paciente Pensa de Nós
                </h2>
                <div className="flex flex-wrap items-center justify-center my-32">
                    {isLoaded
                        ? reviews.map((depoimento, index) => (
                              <Depoimento
                                  key={index}
                                  depoimento={depoimento}
                                  index={index}
                              />
                          ))
                        : [...Array(4)].map((_, index) => (
                              <DepoimentoLoading key={index} index={index} />
                          ))}
                </div>

                <div className="flex items-center justify-center rounded-full bg-secondary h-[600px] w-[600px] absolute top-[35%] left-[50%] -translate-y-1/2 -translate-x-1/2 opacity-[75%] z-0">
                    <div className="rounded-full bg-primary h-[440px] w-[440px] opacity-[75%] z-0 pulsing"></div>
                    <div className="invisible xl:visible flex flex-col items-center justify-center h-full z-10 absolute">
                        <div className="flex items-center justify-center">
                            <FaStar className="text-[#f8be00] drop-shadow-xl text-xl" />
                            <FaStar className="text-[#f8be00] drop-shadow-xl text-xl" />
                            <FaStar className="text-[#f8be00] drop-shadow-xl text-xl" />
                            <FaStar className="text-[#f8be00] drop-shadow-xl text-xl" />
                            <FaStar className="text-[#f8be00] drop-shadow-xl text-xl" />
                        </div>
                        <span className="text-white text-5xl font-inter font-bold drop-shadow-md">
                            {rating.toFixed(1)}
                        </span>
                    </div>
                </div>

                <Contato />
            </div>
        </section>
    )
}

export default Depoimentos
