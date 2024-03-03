'use client'
import { CalendarProvider } from './CalendarContext'
import Agenda from './Agenda'
import CalendarControls from './CalendarControls'

const CalendarRoot = ({ children }) => {
    return (
        <CalendarProvider>
            <div className="flex items-center justify-between">{children}</div>
        </CalendarProvider>
    )
}

const Calendar = () => {
    return (
        <CalendarRoot>
            <Agenda />
            <CalendarControls />
        </CalendarRoot>
    )
}

export default Calendar
