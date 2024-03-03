'use client'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const useAgendamentos = (id) => {
    const { data: agdmts, isLoading: isLoadingAgdmts } = useSWR(
        `/api/agendamentos?id=${id}`,
        fetcher
    )
    return { agdmts, isLoadingAgdmts }
}

export default useAgendamentos
