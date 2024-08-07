'use client'
import React, {useEffect} from 'react'
import { Agendamento, Valores } from '.'
import { LiaFileMedicalAltSolid } from 'react-icons/lia'
import { FaUserDoctor } from 'react-icons/fa6'
const Servico = ({ servico, color, index }) => {
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
        <div
            key={index}
            className="flex flex-col  items-center justify-between min-w-[250px] max-w-[300px] lg:max-w-[400px] min-h-[500px] max-h-[600px] bg-white rounded-xl shadow-[0px_0px_12px_2px_rgba(255,255,255,0.2)] p-8 text-center w-full h-full relative overflow-hidden"
        >
            <div
                className={`w-28 h-28 rounded-lg shadow-[1px_1px_4px_1px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center mb-4`}
                style={{ backgroundColor: color }}
            >
                {servico.type === 'servico' ? (
                    <FaUserDoctor className="w-16 h-16 text-white drop-shadow-[0px_0px_4px_rgba(200,200,200,0.5)]" />
                ) : (
                    <LiaFileMedicalAltSolid className="w-16 h-16 text-white drop-shadow-[0px_0px_4px_rgba(200,200,200,0.5)]" />
                )}
            </div>

            <span className="font-bold text-xl  text-clamp-2 mb-4">
                {servico.nome}
            </span>

            <p>{servico.descricao}</p>

            {servico.valores && (
                <Valores
                    valores={servico.valores}
                    valorSocial={servico.valorSocial}
                />
            )}

                        <button
                            onClick={() => handleClick('https://wa.link/s53js2')}
                            className="bg-primary text-white py-4 rounded-xl font-bold cursor-pointer transition duration-300 ease-in-out hover:scale-110 w-full text-center"
                        >
                            Solicitar Agendamento
                        </button>
        </div>
    )
}

export default Servico
