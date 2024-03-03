import { ConsultasList, LineChart, RadarChart } from '.'

const DashBoard = () => {
    return (
        <main className="col-span-4 row-span-1 row-start-2 rounded-lg grid grid-rows-[350px_minmax(0,1fr)] grid-cols-3 gap-4">
            <div className="col-span-2 text-black rounded-lg bg-[#f4f4f4] dark:bg-black dark:border-[1px] dark:border-[#404040] relative shadow-md">
                <LineChart
                    title={'Consultas'}
                    description={'Quantidade de consultas desta semana'}
                    tooltipLabel={'Consultas'}
                />
            </div>

            <div className="col-span-1 row-span-2 h-full">
                <ConsultasList />
            </div>
            <div className="col-span-2">
                <RadarChart
                    title={'Departamentos'}
                    description={'Número de consultas para cada departamento'}
                />
            </div>
        </main>
    )
}

export default DashBoard
