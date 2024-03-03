import { createContext, useState, useContext, useEffect } from 'react'
import { formatTime } from '@/app/utils/textUtils'
const CalendarContext = createContext()

export const CalendarProvider = ({ children }) => {
    const [consultas, setConsultas] = useState([])
    const [filteredConsultas, setFilteredConsultas] = useState([])
    const [profissionais, setProfissionais] = useState([])
    const [profissional, setProfissional] = useState('')
    const [events, setEvents] = useState([])
    useEffect(() => {
        const fetchprofissionais = async () => {
            const response = await fetch('/api/profissionais')
            const data = await response.json()
            setProfissionais(data)
            setProfissional(data[0])
        }
        const getConsultas = async () => {
            const response = await fetch('/api/agendamentos')
            const data = await response.json()
            setConsultas(data)
            setFilteredConsultas(data)
        }
        fetchprofissionais()
        getConsultas()
    }, [])

    const handleProfissionalChange = (id) => {
        const profissional = profissionais.find(
            (profissional) => profissional._id === id
        )
        setProfissional(profissional)

        const filtered = consultas.filter(
            (consulta) => consulta.profissional._id === id
        )
        setFilteredConsultas(filtered)

        const response = filtered.map((consulta) =>
            handleConsultasToEvents(consulta)
        )
        setEvents(response)
    }

    const handleConsultasToEvents = (consulta) => {
        const date = new Date(consulta.date)
        const start = new Date(date.setHours(date.getHours() + 3))
        const end = new Date(date.setMinutes(date.getMinutes() + 40))

        const startString = formatTime(new Date(start.getTime() - 10800000))
        const endString = formatTime(new Date(end.getTime() - 10800000))
        return {
            title: `${consulta.servico.nome.split(' ')[0]} de ${
                consulta.nome.split(' ')[0]
            } às ${startString} até ${endString}`,
            start: start,
            end: end,
            color: 'green',
            textColor: 'white',
        }
    }

    return (
        <CalendarContext.Provider
            value={{
                consultas,
                setConsultas,
                filteredConsultas,
                setFilteredConsultas,
                profissionais,
                setProfissionais,
                profissional,
                setProfissional,
                events,
                setEvents,
                handleProfissionalChange,
            }}
        >
            {children}
        </CalendarContext.Provider>
    )
}

export const useCalendar = () => useContext(CalendarContext)
