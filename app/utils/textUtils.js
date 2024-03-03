export const formatPhone = (phone) => {
    const phoneNumbers = phone.replace(/\D/g, '')
    const prefix = phoneNumbers.slice(0, 2)
    const firstFive = phoneNumbers.slice(2, 7)
    const lastFour = phoneNumbers.slice(7, 11)
    return `(${prefix}) ${firstFive}-${lastFour}`
}

export const titleCase = (str) => {
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export const formatCPF = (cpf) => {
    const cpfNumbers = cpf.replace(/\D/g, '')
    const firstThree = cpfNumbers.slice(0, 3)
    const secondThree = cpfNumbers.slice(3, 6)
    const thirdThree = cpfNumbers.slice(6, 9)
    const lastTwo = cpfNumbers.slice(9, 11)
    return `${firstThree}.${secondThree}.${thirdThree}-${lastTwo}`
}

export const formatData = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
        timeZone: 'UTC',
    })
}

export const formatTime = (date) => {
    return new Date(date)
        .toLocaleTimeString('pt-BR', {
            timeZone: 'UTC',
        })
        .slice(0, 5)
}

export const formatDatetime = (date) => {
    return `${formatData(date)} às ${formatTime(date)}`
}

export const formatDateToHTML = (date) => {
    return new Date(date).toISOString().split('T')[0]
}

export const validateCPF = (cpf) => {
    const cpfNumbers = cpf.replace(/\D/g, '')
    if (cpfNumbers.length !== 11) return false
    if (cpfNumbers === '00000000000') return false
    let sum = 0
    let rest
    for (let i = 1; i <= 9; i++)
        sum = sum + parseInt(cpfNumbers.substring(i - 1, i)) * (11 - i)
    rest = (sum * 10) % 11
    if (rest === 10 || rest === 11) rest = 0
    if (rest !== parseInt(cpfNumbers.substring(9, 10))) return false
    sum = 0
    for (let i = 1; i <= 10; i++)
        sum = sum + parseInt(cpfNumbers.substring(i - 1, i)) * (12 - i)
    rest = (sum * 10) % 11
    if (rest === 10 || rest === 11) rest = 0
    if (rest !== parseInt(cpfNumbers.substring(10, 11))) return false
    return true
}
