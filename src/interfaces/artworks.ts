import type { IDefaultResponse } from './data'

export interface IArtworkResponse extends IDefaultResponse {
    data: IArtwork
}

export interface IArtworkListResponse extends IDefaultResponse {
    data: IArtwork[]
}

export interface IArtwork {
    id: number // 129884
    api_model: string // 'artworks'
    api_link: string // 'https://api.artic.edu/api/v1/artworks/129884'
    is_boosted: boolean // true
    title: string // 'Starry Night and the Astronauts'
    alt_titles: string[] // null
    thumbnail: {
        lqip: string // 'data:image/gif;base64,R0lGODlhBAAFAPQAABw/Zhg/aBRBaBZBahRCaxxBahxEahNIchZJcR9LdB9OdiZIZSBEbShLbjxRZyBPeipRcSpReUpWaitXgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAEAAUAAAURoMJIDhJAywAcAlEkxhNNTQgAOw=='
        width: number // 5376
        height: number // 6112
        alt_text: string // 'Abstract painting composed of small vertical dabs of multiple shades of blue with a small area of similar strokes of red, orange, and yellow in the upper right.'
    }
    main_reference_number: string // '1994.36'
    has_not_been_viewed_much: boolean // false
    boost_rank: number // 1
    date_start: number // 1972
    date_end: number // 1972
    date_display: string // '1972'
    date_qualifier_title: string // ''
    date_qualifier_id: string // null
    artist_display: string // 'Alma Thomas\nAmerican, 1891-1978'
    place_of_origin: string // 'United States'
    description: string // 'Description'
    dimensions: string // '152.4 x 134.6 cm (60 x 53 in.)'
    dimensions_detail: {
        depth: number // null
        width: number // 134
        height: number // 152
        diameter: number // null
        clarification: string // null
    }[]
    medium_display: string // 'Acrylic on canvas'
    inscriptions: string[] // null
    credit_line: string // 'Purchased with funds provided by Mary P. Hines in memory of her mother, Frances W. Pick'
    catalogue_display: string // null
    publication_history: string // 'Alma Thomas, alma w. thomas, exh. cat. (New York: Whitney Museum of American Art, 1972), n.p., cat. 19. \n\nGene Baro, David C. Driskell, and Jacob Kainen, Alma W. Thomas, exh. cat. (Washington D.C.: Corcoran Gallery of Art, 1972), n.p., cat. 35.\n\nJan Keene Muhlert, Color and Image: Six Artists from Washington, exh. cat. (Iowa City: University of Iowa, 1975), n.p., cat. 80.\n\nAnderson Gallery, Selected Works from the Gallery Collection, exh. checklist (Buffalo: Anderson Gallery), n.p., cat. 23. \n\nAndrea D. Barnwell, “Portfolio,” Art Institute of Chicago Museum Studies 24, 2 (1999), 213, no. 24.\n\nAndrea D. Barnwell and Kirsten P. Buick, “A Portfolio of Works by African American Artists Continuing the Dialogue: A Work in Progress,” Art Institute of Chicago Museum Studies 24, 2 (1999), 187.\n\nIan Berry and Lauren Haynes, Alma Thomas, exh. cat. (Studio Museum in Harlem/Frances Young Tang Teaching Museum and Art Gallery at Skidmore College/DelMonico Books, 2015), 107, 142, 143 (color ill.), 150, 151 (color ill.), 234 (ill.), 246, 250.\n\nRichard Kalina, "Through Color," Art in America, 104, 5 (May 2016), 124 (color ill.), 125.\n\nKen Johnson, "\'Alma Thomas,\' and Incandescent Painter" The New York Times (online), Aug. 4, 2016, https://www.nytimes.com/2016/08/05/arts/design/alma-thomas-an-incandescent-pioneer.html \n\nSeth Feman and Jonathan Frederick Walz, eds. Alma W. Thomas: Everything Is Beautiful, exh. cat. (Columbus, GA: The Columbus Museum, 2021), 295, cat. 143 (color ill.).\n\nNeil Steinberg, “Art can take you to a particular place,” Chicago Tribune, Dec. 20, 2023, 2 (color ill.).'
    exhibition_history: string // 'Exhibition history'
    edition: string // null
    publishing_verification_level: string // 'Web Cataloged'
    internal_department_id: number // 246
    fiscal_year: number // 1994
    fiscal_year_deaccession: number // null
    is_public_domain: boolean // false
    is_zoomable: boolean // true
    max_zoom_window_size: number // 1280
    copyright_notice: string // '© Estate of Alma Thomas (Courtesy of the Hart Family) / Artists Rights Society (ARS), New York'
    has_multimedia_resources: boolean // false
    has_educational_resources: boolean // false
    has_advanced_imaging: boolean // false
    colorfulness: number // 53.6375
    color: {
        h: number // 45
        l: number // 49
        s: number // 94
        percentage: number // 0.0035946655163737015
        population: number // 29
    }
    latitude: number // 41.8805769576144
    longitude: number // -87.6218733015747
    latlon: string // '41.880576957614,41.880576957614'
    is_on_view: boolean // true
    on_loan_display: string // null
    gallery_title: string // 'Regenstein Hall'
    gallery_id: number // 2147475902
    nomisma_id: number // null
    artwork_type_title: string // 'Painting'
    artwork_type_id: number // 1
    department_title: string // 'Contemporary Art'
    department_id: number // 'PC-8'
    artist_id: number // 44708
    artist_title: string // 'Alma Thomas'
    alt_artist_ids: number[] // []
    artist_ids: number[] // [44708]
    artist_titles: string[] // ['Alma Thomas']
    category_ids: string[] // ['PC-8', 'PC-142', 'PC-825', 'PC-830']
    category_titles: string[] // [ 'Contemporary Art', 'African American artists' ]
    term_titles: string[] // [ 'painting', 'painting (image making)' ]
    style_id: string // 'TM-12062'
    style_title: string // 'contemporary'
    alt_style_ids: string[] // []
    style_ids: string[] // ['TM-12062']
    style_titles: string[] // ['contemporary']
    classification_id: string // 'TM-9'
    classification_title: string // 'painting'
    alt_classification_ids: string[] // ['TM-155']
    classification_ids: string[] // ['TM-9', 'TM-155']
    classification_titles: string[] // ['painting', 'modern and contemporary art']
    subject_id: string // 'TM-12793'
    alt_subject_ids: string[] // ['TM-11843', 'TM-11851', 'TM-11905', 'TM-11842']
    subject_ids: string[] // ['TM-12793', 'TM-11843', 'TM-11851', 'TM-11905', 'TM-11842']
    subject_titles: string[] // [ 'patterns', 'blue (color)' ]
    material_id: string // 'TM-2407'
    alt_material_ids: string[] // ['TM-3124']
    material_ids: string[] // ['TM-2407', 'TM-3124']
    material_titles: string[] // ['acrylic paint', 'canvas']
    technique_id: string // 'TM-3891'
    alt_technique_ids: string[] // []
    technique_ids: string[] // ['TM-3891']
    technique_titles: string[] // ['painting (image making)']
    theme_titles: string[] // [ 'African American artists', 'Women artists' ]
    image_id: string // 'e966799b-97ee-1cc6-bd2f-a94b4b8bb8f9'
    alt_image_ids: string[] // []
    document_ids: string[] // []
    sound_ids: string[] // []
    video_ids: string[] // []
    text_ids: string[] // []
    section_ids: string[] // []
    section_titles: string[] // []
    site_ids: string[] // []
    suggest_autocomplete_boosted: string // 'Starry Night and the Astronauts'
    suggest_autocomplete_all: {
        input: string[] // ['Starry Night and the Astronauts']
        weight?: number // 35074
        contexts: {
            groupings: string[] // ['title']
        }
    }[]
    source_updated_at: string // '2025-01-22T15:55:48-06:00'
    updated_at: string // '2025-02-19T23:20:13-06:00'
    timestamp: string // '2025-02-20T20:34:57-06:00'
}
