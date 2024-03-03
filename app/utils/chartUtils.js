export const getWeekDays = () => {
    const currentDate = new Date()

    var firstDayOfWeek = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay())
    )
    firstDayOfWeek = new Date(firstDayOfWeek.setHours(-3, 0, 0, 0))
    const lastDayOfWeek = new Date(firstDayOfWeek)
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6)

    return { firstDayOfWeek, lastDayOfWeek }
}

export const formatData = (data, consultasByDay) => {
    return data.map((day) => {
        const currentDay = String(day.getDate()).padStart(2, '0')
        const month = String(day.getMonth() + 1).padStart(2, '0')
        const formatedKey = `${currentDay}/${month}`
        const key = `${day.getDate()}/${day.getMonth() + 1}`
        return {
            name: formatedKey,
            value: consultasByDay[key] || 0,
        }
    })
}

export async function getConsultasByDateRange(firstDayOfWeek, lastDayOfWeek) {
    const response = await getConsultasByDate(firstDayOfWeek, lastDayOfWeek)
    const agendamentos = await response.json()

    const allTheDays = []
    let actualDay = new Date(firstDayOfWeek)
    while (actualDay <= lastDayOfWeek) {
        allTheDays.push(new Date(actualDay))
        actualDay.setDate(actualDay.getDate() + 1)
    }

    const consultasByDay = {}

    agendamentos.forEach((agendamento) => {
        const agendamentoDate = new Date(agendamento.date)
        const key = `${agendamentoDate.getDate()}/${
            agendamentoDate.getMonth() + 1
        }`
        consultasByDay[key] = (consultasByDay[key] || 0) + 1
    })

    return formatData(allTheDays, consultasByDay)
}

export async function getConsultasByDate(firstDayOfWeek, lastDayOfWeek) {
    return await fetch(
        `/api/agendamentos?startTime=${firstDayOfWeek.toISOString()}&endTime=${lastDayOfWeek.toISOString()}`
    )
}

async function getDepartamentos() {
    return await fetch(`/api/departamentos`)
}

export async function getConsultasByDateRangeDepartments(
    firstDayOfWeek,
    lastDayOfWeek
) {
    const response = await getConsultasByDate(firstDayOfWeek, lastDayOfWeek)
    const agendamentos = await response.json()

    const responseDepartamentos = await getDepartamentos()
    const values = []
    const departments = await responseDepartamentos.json()

    departments.departamentos.forEach((department) => {
        if (department.name === 'Em Breve') return
        values[department._id] = 0
    })

    agendamentos.forEach((agendamento) => {
        values[agendamento.servico.departamento] += 1
    })
    // normalize keys from _id to name
    const valuesNormalized = []

    Object.keys(values).forEach((key) => {
        valuesNormalized.push({
            name: departments.departamentos.find(
                (departamento) => departamento._id === key
            ).name,
            Valor: values[key],
        })
    })
    return valuesNormalized
}
