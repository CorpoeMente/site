'use client'
import React, { useRef, useEffect } from 'react'

import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import brLocale from '@fullcalendar/core/locales/pt-br'
import timeGridPlugin from '@fullcalendar/timegrid'

import { useCalendar } from './CalendarContext'

const Agenda = () => {
    const { events } = useCalendar()
    const calendarRef = useRef(null)
    useEffect(() => {
        const calendar = new Calendar(calendarRef.current, {
            plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
            initialView: 'timeGridThreeDay',
            locale: brLocale,
            events: events,
            eventOverlap: false,
            slotEventOverlap: false,
            eventOrder: '-type',
            eventDisplay: 'background',
            eventTimeFormat: {
                hour: '2-digit',
                minute: '2-digit',
                meridiem: false,
            },
            views: {
                timeGridThreeDay: {
                    type: 'timeGrid',
                    duration: { days: 3 },
                    buttonText: '3 dias',
                    allDaySlot: false,
                    slotMinTime: '08:00:00',
                    slotMaxTime: '21:00:00',
                    expandRows: true,
                    nowIndicator: true,
                    slotLabelFormat: {
                        hour: 'numeric',
                        minute: '2-digit',
                        omitZeroMinute: false,
                        meridiem: 'short',
                    },
                },
            },
            eventMouseEnter: (info) => {
                const container = info.el.closest('.fc-timegrid-event-harness')

                if (container) {
                    container.style.transition = 'z-index 0.3s'
                    container.style.zIndex = '100'
                }
            },
            eventMouseLeave: (info) => {
                const container = info.el.closest('.fc-timegrid-event-harness')
                if (container) {
                    container.style.zIndex = '1'
                }
            },
            businessHours: [
                {
                    daysOfWeek: [1, 2],
                    startTime: '08:00',
                    endTime: '21:20',
                },
                {
                    daysOfWeek: [3],
                    startTime: '08:00',
                    endTime: '18:00',
                },
                {
                    daysOfWeek: [4],
                    startTime: '08:00',
                    endTime: '23:10',
                },
                {
                    daysOfWeek: [5],
                    startTime: '08:00',
                    endTime: '18:00',
                },
                {
                    daysOfWeek: [6],
                    startTime: '08:00',
                    endTime: '13:00',
                },
            ],
        })
        calendar.setOption('contentHeight', 800)
        calendar.render()
    }, [calendarRef, events])

    return (
        <div className="flex flex-col items-center justify-center overflow-auto h-full w-3/4 card-shadow bg-[#f4f4f4] dark:bg-[#202020] p-8 rounded-lg">
            <div className="w-full h-full" ref={calendarRef}></div>
        </div>
    )
}

export default Agenda
