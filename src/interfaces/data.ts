export interface IDefaultResponse {
    pagination: IApiPagination
    info: IApiInfo
    config: IApiConfig
}

export interface IApiPagination {
    total: number // 116941
    limit: number // 2
    offset: number // 0
    total_pages: number // 58471
    current_page: number // 1
    next_url: string // 'https://api.artic.edu/api/v1/artworks?page=2&limit=2'
}

export interface IApiInfo {
    license_text: string // 'The `description` field in this response is licensed under a Creative Commons Attribution 4.0 Generic License (CC-By) and the Terms and Conditions of artic.edu. All other data in this response is licensed under a Creative Commons Zero (CC0) 1.0 designation and the Terms and Conditions of artic.edu.'
    license_links: string[] // [ 'https://creativecommons.org/publicdomain/zero/1.0/', 'https://www.artic.edu/terms' ]
    version: string // '1.13'
}

export interface IApiConfig {
    iiif_url: string // 'https://www.artic.edu/iiif/2'
    website_url: string // 'https://www.artic.edu'
}
