import type {
    IArtworkListResponse,
    IArtworkResponse,
} from '../interfaces/artworks'
import { fetcher, type IFetcher } from './fetcher'

interface IGetArtworks extends Omit<IFetcher, 'endpoint'> {}

export const getArtworks = async (
    props?: IGetArtworks
): Promise<IArtworkListResponse> => {
    return await fetcher({ endpoint: 'artworks', ...props })
}

export const getArtworkById = async ({
    id,
    ...props
}: IGetArtworks): Promise<IArtworkResponse> => {
    return await fetcher({ endpoint: 'artworks', id, ...props })
}

export const searchArtworks = async ({
    q,
    ...props
}: IGetArtworks): Promise<IArtworkListResponse> => {
    return await fetcher({ endpoint: 'artworks/search', q: q, ...props })
}
