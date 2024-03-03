'use client'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const useProfissionais = () => {
    const { data: profs, isLoading: isLoadingProfs } = useSWR(
        '/api/profissionais',
        fetcher
    )
    return { profs, isLoadingProfs }
}

export default useProfissionais
