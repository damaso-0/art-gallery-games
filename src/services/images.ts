export const getImageUrl = (
    image_id: string | undefined,
    size: '400' | '843' | '1686' = '843'
): string => {
    if (!image_id) return ''
    return `https://www.artic.edu/iiif/2/${image_id}/full/${size},/0/default.jpg`
}
