"use client";
import React, { useEffect, useState } from "react";
import { Contato, Depoimento } from "../Components";
import { useLoadScript } from "@react-google-maps/api";
import { FaStar } from "react-icons/fa";
const libraries = ["places"];

const Depoimentos = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB60XCMntI4rMCwwTeLIHnRGcfalkZzcO8",
    libraries,
  });

  useEffect(() => {
    if (isLoaded && !loadError) {
      const mapDiv = document.createElement("div");
      mapDiv.style.display = "none";
      document.body.appendChild(mapDiv);

      const service = new google.maps.places.PlacesService(mapDiv);
      service.getDetails(
        {
          placeId: "ChIJpTOxo44zWpMRmykTswG9dQI",
          fields: ["reviews", "rating"],
        },

        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setReviews(place.reviews.slice(0, 4));
            setRating(place.rating);
          }
        }
      );
      return () => {
        try {
          document.body.removeChild(mapDiv);
        } catch (e) {}
      };
    }
  }, [isLoaded, loadError]);
  if (!isLoaded) return;
  if (window.innerWidth <= 1580) return;
  return (
    <section
      className="w-screen bg-gradient-180 from-white via-40% to-[#f0f0f0] flex flex-col items-center xl:px-[15%] pt-[5%] relative h-[150vh]"
      id="depoimentos"
    >
      <img
        src="/depoimentos-background.jpg"
        className="absolute top-0 left-0 w-screen h-[150vh] opacity-[20%] bg-cover object-top object-cover bg-center"
      />
      <span className="text-secondary text-2xl font-bold drop-shadow-2xl drop-shadow-[0_0px_2px_rgba(0,52,8,0.2)] m-[-6px]">
        Depoimentos
      </span>
      <h2 className="text-primary text-4xl font-bold drop-shadow-[0_0px_3px_rgba(89,182,222,0.2)]">
        Oque Nosso Paciente Pensa de Nós
      </h2>
      <div className="flex flex-wrap items-center justify-center mt-32 -mb-24">
        {reviews.map((depoimento, index) => (
          <Depoimento key={index} depoimento={depoimento} index={index} />
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
    </section>
  );
};

export default Depoimentos;
