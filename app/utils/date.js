export function getWeekDay(date) {
    const days = [
        'segunda',
        'terca',
        'quarta',
        'quinta',
        'sexta',
        'sabado',
        'domingo',
    ]
    return days[date.getDay()]
}
