'use client'
import React, { useEffect, useState } from 'react'
import { DepoimentoMobile, Contato } from '../Components'
import { useLoadScript } from '@react-google-maps/api'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const libraries = ['places']

const DepoimentosMobile = () => {
    const [reviews, setReviews] = useState([])
    const [selectedReview, setSelectedReview] = useState(null)
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_API_KEY,
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
                    fields: ['reviews'],
                },

                (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        setReviews(place.reviews.slice(0, 4))
                        setSelectedReview(place.reviews[0])
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
    if (!isLoaded) return

    const handleNext = () => {
        const index = reviews.indexOf(selectedReview)

        if (index == reviews.length - 1) {
            setSelectedReview(reviews[0])
        } else {
            setSelectedReview(reviews[index + 1])
        }
    }

    const handlePrev = () => {
        const index = reviews.indexOf(selectedReview)
        if (index == 0) {
            setSelectedReview(reviews[reviews.length - 1])
        } else {
            setSelectedReview(reviews[index - 1])
        }
    }

    return (
        <section
            className="block xl:hidden w-screen bg-white place-items-center grid grid-cols-1 xl:px-[15%] py-[5%] relative h-auto"
            id="depoimentos"
        >
            <img
                alt="Depoimentos"
                src="/depoimentos-background.jpg"
                className="absolute top-0 left-0 w-full h-full opacity-[37%] bg-cover object-top object-cover bg-center"
            />
            <div className="flex flex-col items-center justify-center w-full mb-16 z-10">
                <span className="text-secondary text-lg xl:font-xl font-bold">
                    Depoimentos
                </span>
                <h2 className="text-primary text-2xl xl:font-3xl font-black text-center w-3/4">
                    Oque Nosso Paciente Pensa de Nós
                </h2>
            </div>
            <div className="flex items-center justify-center w-screen relative mb-16 md:mb-48">
                {selectedReview && (
                    <DepoimentoMobile depoimento={selectedReview} />
                )}

                <FaChevronLeft
                    onClick={handlePrev}
                    className="absolute top-1/2 transform -translate-y-1/2 text-[#fff] text-4xl cursor-pointer hover:text-secondary absolute drop-shadow-[0px_0px_2px_rgba(0,0,0,0.5)] left-[4px] min-[400px]:left-[10px] md:left-[36px] transform z-40 large-drop-shadow"
                />
                <FaChevronRight
                    onClick={handleNext}
                    className="absolute top-1/2 transform -translate-y-1/2 text-[#fff] text-4xl cursor-pointer hover:text-secondary absolute drop-shadow-[0px_0px_2px_rgba(0,0,0,0.5)] right-[4px] min-[400px]:right-[8px] md:right-[36px] transform z-40 large-drop-shadow "
                />
            </div>

            <Contato />
        </section>
    )
}

export default DepoimentosMobile
