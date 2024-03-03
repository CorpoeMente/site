'use client'
import React, { useEffect } from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { useTheme } from 'next-themes'
import { getWeekDays, getConsultasByDateRange } from '@app/utils/chartUtils'
const LineChart = ({ title = null, description = null, tooltipLabel }) => {
    const [data, setData] = React.useState([])
    const { theme } = useTheme()
    const fill = theme === 'dark' ? '#fff' : '#000'

    useEffect(() => {
        const fetchData = async () => {
            const { firstDayOfWeek, lastDayOfWeek } = getWeekDays()

            try {
                const formattedData = await getConsultasByDateRange(
                    firstDayOfWeek,
                    lastDayOfWeek
                )

                setData(formattedData)
            } catch (error) {
                console.error('Erro ao buscar os agendamentos:', error)
            }
        }

        fetchData()
    }, [])
    const max = Math.max(...data.map((item) => item.value))

    const CustomXTick = ({ x, y, stroke, payload }) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dx={20} dy={16} fill={fill} textAnchor="end">
                    {payload.value}
                </text>
            </g>
        )
    }

    const CustomYTick = ({ x, y, stroke, payload }) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={6} dx={-6} fill={fill} textAnchor="end">
                    {payload.value}
                </text>
            </g>
        )
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="bg-[#003458] text-white p-2 rounded-md">
                    <p className="label">{tooltipLabel ? tooltipLabel : ''}</p>
                    <p className="label">{`${label} : ${
                        payload ? payload[0]?.value : ''
                    }`}</p>
                </div>
            )
        }
        return null
    }

    return (
        <ResponsiveContainer
            className="pt-6 shadow-[0px_0px_8px_4px_rgba(0,0,0,0.3)] rounded"
            width="100%"
            height="100%"
        >
            {title && (
                <span className="font-bold text-xl text-black dark:text-white ms-[50px]">
                    {title}
                </span>
            )}
            {description && (
                <p className="font-urbanist font-medium text-black text-[#505050] dark:text-[#a0a0a0] ms-[50px]">
                    {description}
                </p>
            )}
            <AreaChart
                width={130}
                height={200}
                data={data}
                margin={{ top: 20, right: 40, left: 0, bottom: 60 }}
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
                <XAxis dataKey="name" tick={<CustomXTick />} stroke="#66A1B8" />
                <YAxis
                    domain={[0, Math.max(...[max, 5])]}
                    tick={<CustomYTick />}
                    stroke="#66A1B8"
                />
                <CartesianGrid
                    horizontalCoordinatesGenerator={(props) =>
                        props.height > 250
                            ? Array.from(
                                  {
                                      length: 8,
                                  },
                                  function (_, i) {
                                      return (i + 1) * 30 + 50
                                  }
                              )
                            : [100, 200]
                    }
                    verticalCoordinatesGenerator={(props) =>
                        props.width > 450
                            ? Array.from({ length: 40 }, function (_, i) {
                                  return (i + 3) * 25
                              })
                            : [200, 400]
                    }
                    stroke={fill}
                    opacity={0.08}
                    strokeWidth={0.5}
                />
                <Tooltip content={<CustomTooltip />} />
                {data && data.length > 0 && (
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#003458"
                        fillOpacity={1}
                        fill="url(#colorChart)"
                    />
                )}
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default LineChart
