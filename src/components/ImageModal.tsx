import { Fragment, useEffect, useState, useRef } from 'react'
import type { IArtwork } from '../interfaces/artworks'
import { getImageUrl } from '../services/images'
import '../styles/image-modal.css'
import ImageViewer from './ImageViewer'
import { getArtworkById } from '../services/artworks'

interface IImageModal
    extends Pick<IArtwork, 'id' | 'image_id' | 'thumbnail' | 'color'> {}

const ImageModal = ({ id, image_id, thumbnail, color }: IImageModal) => {
    const [data, setData] = useState<IArtwork | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [loading, setLoading] = useState(false)

    const hasFetched = useRef(false)

    const handleGetData = async () => {
        if (hasFetched.current) return

        setLoading(true)

        try {
            const { data } = await getArtworkById({
                id,
                fields: [
                    'id',
                    'artist_display',
                    'artist_id',
                    'title',
                    'date_display',
                    'date_display',
                    'artwork_type_title',
                    'artwork_type_id',
                    'description',
                ],
            })
            if (data) {
                setData(data)
                hasFetched.current = true
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen && !hasFetched.current) {
            handleGetData()
        }
    }, [isOpen])

    const defaultImage =
        'https://www.artic.edu/iiif/2/3b374643-5328-3e00-c02b-5ab56e5ae8f8/full/843,/0/default.jpg'

    return (
        <Fragment>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`image-modal-thumbnail w-full h-full m-0 p-0 ${!isOpen ? 'cursor-pointer' : ''}`}
            >
                <div
                    className="w-full max-w-80 h-auto bg-zinc-900 rounded-md overflow-hidden"
                    style={{
                        aspectRatio: `${thumbnail?.width}/${thumbnail?.height}`,
                    }}
                >
                    <img
                        src={imageError ? defaultImage : getImageUrl(image_id)}
                        alt={thumbnail?.alt_text}
                        className={`image-modal-image w-full transition-all ${isOpen ? 'blur-sm' : ''}`}
                        loading="lazy"
                        decoding="async"
                        onError={() => setImageError(true)}
                    />
                </div>
            </button>

            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="w-full h-full fixed top-0 left-0 flex justify-center items-center z-1 bg-[rgba(0,0,0,0.6)] px-8"
                >
                    <div
                        className="image-modal-wrapper w-full max-w-3xl min-w-80 h-fit min-h-80 grid grid-cols-2 gap-10 bg-zinc-800 rounded-xl relative p-2 transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <div
                            className="image-modal-image-background w-full h-full py-[1rem] bg-zinc-900 rounded-md flex justify-center items-center overflow-hidden"
                            style={{
                                background: `hsla(${color?.h}, ${color?.s}%, ${color?.l}%)`,
                            }}
                        >
                            <div className="max-w-80 min-w-80 rounded-md z-1">
                                <ImageViewer
                                    galleryID="quiz-image-viewer"
                                    images={[
                                        {
                                            largeURL: imageError
                                                ? defaultImage
                                                : getImageUrl(image_id),
                                            thumbnailURL: imageError
                                                ? defaultImage
                                                : getImageUrl(image_id),
                                            width: thumbnail?.width ?? 200,
                                            height: thumbnail?.height ?? 200,
                                            alt: thumbnail?.alt_text ?? '',
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="w-full h-full flex flex-col gap-4 py-8">
                            <h2
                                className={`${loading ? 'image-modal-info-skeleton' : ''} min-h-10 text-2xl font-bold text-zinc-100 mr-8`}
                                dangerouslySetInnerHTML={{
                                    __html: data?.title ?? '',
                                }}
                            />

                            <div
                                className={`${loading ? 'image-modal-info-skeleton' : ''} min-h-5 flex gap-6 gap-y-1 flex-wrap items-center mr-8`}
                            >
                                <p className="text-zinc-400 text-sm">
                                    {data?.artist_title && (
                                        <a
                                            href={`/artists/${data?.artist_id}`}
                                            className="font-semibold underline underline-offset-2 decoration-zinc-600 transition-colors hover:decoration-zinc-400"
                                        >
                                            {data?.artist_title}
                                        </a>
                                    )}
                                    {data?.artist_title &&
                                        data?.date_display && <span>, </span>}
                                    {data?.date_display && (
                                        <span>{data?.date_display}</span>
                                    )}
                                </p>

                                <a
                                    href={`/artworks/types/${data?.artwork_type_id}`}
                                    className="text-zinc-400 text-sm font-semibold underline underline-offset-2 decoration-zinc-600 transition-colors hover:decoration-zinc-400"
                                >
                                    {data?.artwork_type_title}
                                </a>
                            </div>

                            <p
                                className={`${loading ? 'image-modal-info-skeleton' : ''} image-modal-description text-zinc-400 text-sm text-justify max-h-100 overflow-y-auto pr-4 ${loading ? 'min-h-40 mr-8' : ''}`}
                                dangerouslySetInnerHTML={{
                                    __html: data?.description ?? '',
                                }}
                            />

                            <a
                                href={`/artworks/${data?.id}`}
                                className={`${loading ? 'image-modal-info-skeleton' : ''} min-h-5 text-zinc-400 text-sm font-semibold underline underline-offset-2 decoration-zinc-600 transition-colors hover:decoration-zinc-400 mt-auto ${loading ? 'mr-56' : ''}`}
                            >
                                {!loading && 'Full specification'}
                            </a>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-zinc-200 font-semibold bg-zinc-700 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer transition-colors hover:bg-zinc-600"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ImageModal
