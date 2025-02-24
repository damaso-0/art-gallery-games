import ImageViewer from '../../../../../components/ImageViewer'
import type { IArtwork } from '../../../../../interfaces/artworks'
import { getImageUrl } from '../../../../../services/images'

interface IImageArea {
    artwork: IArtwork | null
    handleImageLoaded: () => void
}

/** Quiz Game Image Area */
const ImageArea = ({ artwork, handleImageLoaded }: IImageArea) => {
    return (
        <figure className="w-full flex flex-col gap-4">
            <ImageViewer
                onImageLoaded={handleImageLoaded}
                galleryID="quiz-image-viewer"
                images={[
                    {
                        largeURL: getImageUrl(artwork?.image_id, '1686'),
                        thumbnailURL: getImageUrl(artwork?.image_id, '843'),
                        width: artwork?.thumbnail?.width ?? 200,
                        height: artwork?.thumbnail?.height ?? 200,
                        alt: artwork?.title ?? '',
                    },
                ]}
            />
            <figcaption className="text-1xl text-center font-bold text-white">
                {artwork?.title}
            </figcaption>
        </figure>
    )
}

export default ImageArea
