'use client'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const useServicos = () => {
    const { data: servs, isLoading: isLoadingServs } = useSWR(
        '/api/servicos',
        fetcher
    )
    return { servs, isLoadingServs }
}

export default useServicos
