import type { IArtworkListResponse, IArtworkResponse } from '../interfaces/artworks'
import { fetcher, type IFetcher } from './fetcher'

interface IGetArtworks extends Omit<IFetcher, 'endpoint'> {}

export const getArtworks = async (props?: IGetArtworks): Promise<IArtworkListResponse> => {
    return await fetcher({endpoint: 'artworks', ...props})
}

export const getArtworkById = async (id: number): Promise<IArtworkResponse> => {
    return await fetcher({endpoint: 'artworks', id})
}
