import { API_URL } from '../constants/api'
import type { ApiEndpoint } from '../interfaces/api'

export interface IFetcher {
    endpoint: ApiEndpoint
    id?: number
    limit?: number
    fields?: string[]
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
    const limitParam = limit ? `?limit=${limit}` : ''
    const fieldsParam = fields?.length ? `&fields=${fields.join(',')}` : ''
    const pageParam = page ? `&page=${page}` : ''
    const qParam = q ? `&q=${q}` : ''

    const url = `${API_URL}/${endpoint}${limitParam}${idParam}${qParam}${fieldsParam}${pageParam}`
    const response = await fetch(url)
    return response.json()
}
