import { API_URL } from '../constants/api'
import type { ApiEndpoint } from '../interfaces/api'
import type { IArtwork } from '../interfaces/artworks'

export interface IFetcher {
    endpoint: ApiEndpoint
    id?: number
    limit?: number
    fields?: (keyof IArtwork)[]
    page?: number
    q?: string
}

export const fetcher = async ({
    endpoint,
    id,
    limit = 5,
    fields,
    page,
    q,
}: IFetcher) => {
    const idParam = id ? `/${id}` : ''

    const params = { ...(!id && { limit }), fields, page, q }

    const queryParams = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')

    const url = `${API_URL}/${endpoint}${idParam}?${queryParams}`

    console.log(url)
    const response = await fetch(url)
    return response.json()
}
