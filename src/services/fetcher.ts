import { API_URL } from '../constants/api'
import type { ApiEndpoint } from '../interfaces/api'

export interface IFetcher {
    endpoint: ApiEndpoint
    id?: number
    limit?: number
    fields?: string
    page?: number
}

export const fetcher = async ({ endpoint, id, limit = 5, fields, page }: IFetcher) => {
    const idParam = id ? `/${id}` : ''
    const limitParam = limit ? `?limit=${limit}` : ''
    const fieldsParam = fields ? `&fields=${fields}` : ''
    const pageParam = page ? `&page=${page}` : ''
    
    const url = `${API_URL}/${endpoint}${idParam}${limitParam}${fieldsParam}${pageParam}`
    const response = await fetch(url)
    return response.json()
}
