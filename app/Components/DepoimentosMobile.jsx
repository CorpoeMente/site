"use client";
import React, { useEffect, useState } from "react";
import { DepoimentoMobile, Contato } from "../Components";
import { useLoadScript } from "@react-google-maps/api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const libraries = ["places"];

const DepoimentosMobile = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
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
          fields: ["reviews"],
        },

        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setReviews(place.reviews.slice(0, 4));
            setSelectedReview(place.reviews[0]);
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
  if (window && window.innerWidth > 1580) return;

  const handleNext = () => {
    const index = reviews.indexOf(selectedReview);

    if (index == reviews.length - 1) {
      setSelectedReview(reviews[0]);
    } else {
      setSelectedReview(reviews[index + 1]);
    }
  };

  const handlePrev = () => {
    const index = reviews.indexOf(selectedReview);
    if (index == 0) {
      setSelectedReview(reviews[reviews.length - 1]);
    } else {
      setSelectedReview(reviews[index - 1]);
    }
  };

  return (
    <section
      className="w-screen bg-white flex flex-col items-center xl:px-[15%] py-[5%] relative h-[140vh] xl:h-[160vh]"
      id="departamentos"
    >
      <img
        src="/depoimentos-background.jpg"
        className="absolute top-0 left-0 w-screen h-[140vh] xl:h-[160vh] opacity-[17%] bg-cover object-top object-cover bg-center"
      />
      <span className="text-secondary text-2xl font-bold">Depoimentos</span>
      <h2 className="text-primary text-4xl font-bold text-center">
        Oque Nosso Paciente Pensa de Nós
      </h2>
      <div className="flex items-center justify-center mt-[30vh] xl:mt-72 xl:mb-48 w-screen relative">
        {selectedReview && <DepoimentoMobile depoimento={selectedReview} />}

        <FaChevronLeft
          onClick={handlePrev}
          className="absolute top-[15%] xl:top-[40%] text-[#fff] text-4xl cursor-pointer hover:text-secondary absolute drop-shadow-lg left-[15px] md:left-[36px] transform z-40 large-drop-shadow"
        />
        <FaChevronRight
          onClick={handleNext}
          className="absolute top-[15%] xl:top-[40%] text-[#fff] text-4xl cursor-pointer hover:text-secondary absolute drop-shadow-lg right-[15px] md:right-[36px] transform z-40 large-drop-shadow "
        />
      </div>

      <div className="hidden min-[400px]:flex absolute items-center justify-center rounded-full bg-secondary aspect-square w-[600px] max-w-[90vw]  top-[35%] left-[50%] -translate-y-1/2 -translate-x-1/2 opacity-[75%] z-0">
        <div className="rounded-full bg-primary  aspect-square w-[440px] max-w-[65vw] opacity-[75%] z-0 pulsing"></div>
      </div>

      <Contato />
    </section>
  );
};

export default DepoimentosMobile;
