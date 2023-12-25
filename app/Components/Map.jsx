'use client'
import React, { useEffect, useState } from 'react'
import { useLoadScript } from '@react-google-maps/api'

const libraries = ['places']

const Map = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        libraries,
    })
    // Convert string to floating point number
    const lat = process.env.NEXT_PUBLIC_LATITUDE
    const long = process.env.NEXT_PUBLIC_LONGITUDE
    const placeId = process.env.NEXT_PUBLIC_PLACE_ID
    const latitude = parseFloat(lat)
    const longitude = parseFloat(long)
    useEffect(() => {
        if (isLoaded && !loadError) {
            const mapDiv = document.getElementById('map')

            const map = new google.maps.Map(mapDiv, {
                center: { lat: latitude, lng: longitude },
                zoom: 18,
            })
            var marker = new google.maps.Marker({
                map: map,
                place: {
                    placeId: placeId,
                    location: { lat: latitude, lng: longitude },
                },
            })

            return () => {}
        }
    }, [isLoaded, loadError])
    if (!isLoaded) return

    const handleClick = () => {
        // open link on new tab
        const url = 'https://maps.app.goo.gl/BLMuLpRPwJEVgrcs7'
        window.open(url, '_blank')
    }
    return (
        <div className="relative items-center justify-center h-[600px] lg:h-[460px] w-full max-w-[80vw] self-center xl:w-[30%] card-shadow  relative rounded-xl">
            <div
                className="h-[100%] lg:h-full w-full bg-contain rounded-xl"
                id="map"
            ></div>
            <button
                onClick={handleClick}
                className="absolute bottom-0 bg-[#e0e0e0] text-primary font-bold  text-2xl w-full py-2 lg:py-4 rounded-b-lg hover:bg-primary hover:text-white transition duration-300 ease-in-out mt-auto"
            >
                Ver no Mapa
            </button>
        </div>
    )
}

export default Map
