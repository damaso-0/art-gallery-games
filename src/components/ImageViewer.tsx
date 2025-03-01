import { useEffect } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import '../styles/image-viewer.css'

interface IImageViewer {
    onImageLoaded?: () => void
    galleryID: string
    images: {
        thumbnailURL: string
        largeURL: string
        width: number
        height: number
        alt: string
    }[]
    className?: string
}

const ImageViewer = (props: IImageViewer) => {
    useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
            gallery: '#' + props.galleryID,
            children: 'a',
            initialZoomLevel: 'fit',
            secondaryZoomLevel: 'fill',
            maxZoomLevel: 1,
            pswpModule: () => import('photoswipe'),
        })

        lightbox.on('uiRegister', function () {
            lightbox.pswp?.ui!.registerElement({
                name: 'custom-caption',
                order: 9,
                isButton: false,
                appendTo: 'root',
                html: 'Caption text',
                onInit: (el, pswp) => {
                    lightbox.pswp!.on('change', () => {
                        const currSlideElement =
                            lightbox.pswp?.currSlide!.data.element
                        let captionHTML = ''
                        if (currSlideElement) {
                            const hiddenCaption =
                                currSlideElement.querySelector(
                                    '.hidden-caption-content'
                                )
                            if (hiddenCaption) {
                                // get caption from element with class hidden-caption-content
                                captionHTML = hiddenCaption.innerHTML
                            } else {
                                // get caption from alt attribute
                                captionHTML =
                                    currSlideElement
                                        .querySelector('img')
                                        ?.getAttribute('alt') || ''
                            }
                        }
                        el.innerHTML = captionHTML || ''
                    })
                },
            })
        })

        lightbox.init()

        return () => {
            lightbox.destroy()
            lightbox = null as any
        }
    }, [])

    return (
        <div className="pswp-gallery relative" id={props.galleryID}>
            {props.images.map((image, index) => (
                <a
                    href={image.largeURL}
                    data-pswp-width={image.width}
                    data-pswp-height={image.height}
                    key={props.galleryID + '-' + index}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={image.thumbnailURL}
                        alt={image.alt}
                        loading="lazy"
                        className={`rounded-md bg-zinc-900 ${props.className}`}
                        onLoad={props.onImageLoaded}
                    />
                </a>
            ))}
        </div>
    )
}

export default ImageViewer
