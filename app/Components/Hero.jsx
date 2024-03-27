'use client'
import Image from 'next/image'
import { useEffect } from 'react'

const Hero = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.googletagmanager.com/gtag/js?id=AW-11464321993";
        script.async = true;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){
            dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-11464321993');
      }, []);
    
    function handleClick(url) {
        gtag_report_conversion(url)
    }

    function gtag_report_conversion(url) {
        var callback = function () {
            if (typeof url !== 'undefined') {
                window.open(url, '_blank')
            }
        }
        gtag('event', 'conversion', {
            send_to: 'AW-11464321993/-WMqCLGUyqAZEMnXztoq',
            value: 0.0,
            currency: 'BRL',
            event_callback: callback,
        })
        return false
    }

    return (
        <section
            className="grid grid-cols-1 place-content-center place-items-center w-screen px-[5%] py-[15%] lg:py-[200px] mt-[70px] relative bg-crop bg-start bg-no-repeat overflow-hidden bg-primary"
            style={{ backgroundImage: `url(/background-hero.webp)` }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center w-full max-w-[90vw] sm:!max-w-[1900px]">
                <div className="relative center-grid flex flex-col items-center xl:items-center justify-center gap-12 px-[10%] xl:px-[15%] slide-bottom z-30">
                    <h1 className="text-4xl lg:text-6xl w-full xl:w-3/4 font-black text-white text-center xl:text-start drop-shadow-[0_4px_1px_rgba(0,0,0,0.35)]">
                        Cuidar do <span className="text-secondary">Corpo</span>{' '}
                        e<span className="text-secondary"> Mente</span> em um só
                        lugar
                    </h1>

                    <p className="text-center w-full text-white  font-regular text-lg xl:text-xl drop-shadow-[0_4px_1px_rgba(0,0,0,0.35)] xl:w-3/4 xl:text-start">
                        Encontre equilíbrio e bem-estar através de cuidados
                        especializados em
                        <span className="text-secondary font-semibold">
                            {' '}
                            psicologia e neuropsicologia
                        </span>
                        . Nossa clínica oferece um ambiente acolhedor para
                        apoiar você em sua jornada de autocuidado.
                    </p>

                    <div className="flex flex-col lg:flex-row items-start gap-12 w-full xl:w-4/5">
                        <button
                            onClick={() => handleClick('https://wa.me/5561991601801')}
                            className="bg-secondary text-primary py-4 rounded-xl font-bold cursor-pointer transition duration-300 ease-in-out hover:scale-110 w-full xl:w-72 text-center"
                        >
                            Entre em Contato
                        </button>
                        <a
                            href="#servicos"
                            className="border-secondary border text-white py-4  rounded-xl font-bold cursor-pointer transition duration-300 ease-in-out hover:bg-secondary w-full xl:w-72 text-center"
                        >
                            Conheça Nossos Serviços
                        </a>
                    </div>
                </div>

                <Image
                    src="/logo-white.webp"
                    alt="Logo da Clínica Corpo e Mente"
                    className="opacity-[0.4] justify-self-center self-start center-grid pointer-events-none drop-shadow-[0_4px_1px_rgba(0,0,0,0.35)] slide-left w-2/3"
                    width={720}
                    height={720}
                    placeholder="blur"
                    blurDataURL="logo-white.webp"
                />
            </div>
        </section>
    )
}

export default Hero
