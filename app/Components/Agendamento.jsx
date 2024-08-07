const Agendamento = ({ servico }) => {
    const handleAgendamento = () => {
        var wpp = 'https://wa.link/s53js2'
        var message = `Olá, gostaria de agendar um horário para ${servico.nome}`
        window.open(`${wpp}?text=${message}`)
    }

    return (
        <button
            onClick={handleAgendamento}
            className="text-white bg-primary font-bold py-2 lg:py-4 text-sm xl:text-md w-full  rounded-lg shadow-lg hover:from-0% hover:scale-[1.03] hover:bg-secondary hover:text-primary transition ease-in-out duration-300"
        >
            Solicitar Agendamento
        </button>
    )
}

export default Agendamento
