'use client'
import React, { useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useCalendar } from './CalendarContext'

const CalendarControls = () => {
    const { profissionais, handleProfissionalChange, profissional } =
        useCalendar()

    useEffect(() => {
        if (profissionais.length > 0) {
            handleProfissionalChange(profissionais[0]._id)
        }
    }, [profissionais])

    return (
        <div className="h-full w-1/5 text-black rounded-lg bg-[#f4f4f4] card-shadow dark:bg-black dark:border-[1px] dark:border-[#404040] relative shadow-md p-4">
            <h1 className="text-2xl text-center font-bold dark:text-white">
                Profissionais
            </h1>
            {profissionais.length > 0 && (
                <RadioGroup
                    defaultValue={profissionais[0].name}
                    className="flex flex-col items-start justify-center gap-4 mt-8 px-8 text-sm dark:text-white"
                >
                    {profissionais.map((prof, index) => {
                        return (
                            <div
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                <RadioGroupItem
                                    onClick={(e) =>
                                        handleProfissionalChange(e.target.value)
                                    }
                                    key={index}
                                    id={prof._id}
                                    value={prof._id}
                                    style={{
                                        color: '#f8be00',
                                    }}
                                    checked={profissional._id === prof._id}
                                />
                                <Label htmlFor={prof._id}>
                                    {prof.nome.split(' ').slice(0, 2).join(' ')}
                                </Label>
                            </div>
                        )
                    })}
                </RadioGroup>
            )}
        </div>
    )
}

export default CalendarControls
