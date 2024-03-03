'use client'
import React, { useEffect, useState } from 'react'
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
} from 'recharts'
import { useTheme } from 'next-themes'
import {
    getConsultasByDateRangeDepartments,
    getWeekDays,
} from '@app/utils/chartUtils'

const Chart = ({ title = null, description = null }) => {
    const { theme } = useTheme()
    const fill = theme === 'dark' ? '#fff' : '#000'
    const CustomTick = ({ x, y, stroke, payload }) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={x / 2}
                    y={y / 10}
                    dx={-115}
                    dy={-14}
                    fill={fill}
                    textAnchor="end"
                >
                    {payload.value}
                </text>
            </g>
        )
    }
    const [data, setData] = useState([])

    useEffect(() => {
        const { firstDayOfWeek, lastDayOfWeek } = getWeekDays()
        const setChart = async () => {
            const agendamentos = await getConsultasByDateRangeDepartments(
                firstDayOfWeek,
                lastDayOfWeek
            )

            setData(agendamentos)
        }
        setChart()
    }, [])

    return (
        <ResponsiveContainer
            className="text-black bg-[#f4f4f4] dark:bg-black dark:border-[1px] dark:border-[#404040] shadow-[0px_0px_8px_4px_rgba(0,0,0,0.3)] rounded flex flex-col items-start justify-center pt-12"
            width={'70%'}
            height={'100%'}
        >
            {title && (
                <span className="ms-[50px] font-semibold text-black dark:text-white">
                    {title}
                </span>
            )}
            {description && (
                <span className="ms-[50px] text-[#505050] dark:text-[#a0a0a0] text-center">
                    {description}
                </span>
            )}
            <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="70%"
                data={data}
                margin={{
                    top: 40,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorChart" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor={'#003458'}
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor={'#003458'}
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <PolarGrid stroke={fill} strokeOpacity={0.05} />
                <PolarAngleAxis
                    dataKey="name"
                    stroke={fill}
                    opacity={0.3}
                    tick={<CustomTick />}
                />
                <Radar
                    name="Valor"
                    dataKey="Valor"
                    stroke={'#003458'}
                    fill="url(#colorChart)"
                    fillOpacity={0.6}
                />
            </RadarChart>
        </ResponsiveContainer>
    )
}

export default Chart
