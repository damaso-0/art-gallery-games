import { Suspense, useEffect, useState } from 'react'
import ImageViewer from '../../../../components/ImageViewer'
import { getImageUrl } from '../../../../services/images'
import { searchArtworks } from '../../../../services/artworks'
import type { IArtwork } from '../../../../interfaces/artworks'
import Modal from '../../../../components/Modal'
import Button from '../../../../components/Button'
import type { IApiPagination } from '../../../../interfaces/data'
import { QUIZ_ARTISTIC_MOVEMENTS } from '../../../../constants/quiz'
import OptionsMenu from './OptionsMenu'
import ImageArea from './ImageArea'

const QuizGame = () => {
    const [score, setScore] = useState({ correct: 0, incorrect: 0 })
    const [exit, setExit] = useState({ press: false, confirm: false })
    const [end, setEnd] = useState(false)

    const [exibitArtworkIds, setExibitArtworkIds] = useState<number[]>([])

    const [data, setData] = useState<IArtwork[]>()
    const [mainArt, setMainArt] = useState<IArtwork>()
    const [pagination, setPagination] = useState<IApiPagination>()
    const [duplicatedArtists, setDuplicatedArtists] = useState<number>(0)
    const [artisticMovement, setArtisticMovement] = useState<string>(
        QUIZ_ARTISTIC_MOVEMENTS[0]
    )
    const [imageLoaded, setImageLoaded] = useState(false)
    const optionsPerQuestion = 4

    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        let nextPage: number = 1
        if (pagination && pagination.current_page < pagination.total_pages) {
            nextPage = pagination.current_page + 1
        }

        const { data, ...props } = await searchArtworks({
            q: 'Impressionism',
            limit: optionsPerQuestion,
            fields: [
                'id',
                'image_id',
                'title',
                'thumbnail',
                'artist_title',
                'artist_id',
                'description',
                'date_display',
                'place_of_origin',
            ],
            page: nextPage,
        })
        const arts = data
        setPagination(props.pagination)

        const verifyIfHasDuplicateArtsts = (arts: IArtwork[]): boolean => {
            const ids = arts?.map((art) => art?.artist_id)?.filter(Boolean)
            if (!ids.length || ids.length < 2) return false
            return ids.length !== new Set(ids).size
        }

        if (verifyIfHasDuplicateArtsts(arts)) {
            return setDuplicatedArtists(duplicatedArtists + 1)
        }

        const getRandomArtwork = (arts: IArtwork[]) => {
            const randomIndex = Math.floor(Math.random() * arts.length)
            return arts?.[randomIndex]
        }

        let mainArt: IArtwork | undefined = getRandomArtwork(arts)

        let i = 0
        while (exibitArtworkIds.includes(mainArt.id) && i < 4) {
            mainArt = getRandomArtwork(arts)
            i++
        }

        if (i === 4) {
            const selectedArtwork = arts.find(
                (art) => !exibitArtworkIds.includes(art.id)
            )
            mainArt = selectedArtwork
        }

        if (!mainArt) {
            setMainArt(undefined)
            setData(undefined)
            setEnd(true)

            setLoading(false)
            return
        }

        setMainArt(mainArt)
        setExibitArtworkIds([...exibitArtworkIds, mainArt.id])
        setData(arts)

        setLoading(false)
    }

    useEffect(() => {
        fetchData()

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && (end || exit.press)) {
                return handleRestart()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    // call more when has duplicated artists
    useEffect(() => {
        if (duplicatedArtists > 0) {
            fetchData()
        }
    }, [duplicatedArtists])

    // increment score
    const handleAnswer = (answer: 'correct' | 'incorrect') => {
        if (answer === 'correct') {
            setScore({ ...score, correct: score.correct + 1 })
        } else {
            setScore({ ...score, incorrect: score.incorrect + 1 })
        }
    }

    const handleImageLoaded = () => setImageLoaded(true)

    const handleExit = () => setExit({ ...exit, press: true })

    const handleRestart = () => {
        setScore({ correct: 0, incorrect: 0 })
        setExibitArtworkIds([])
        setMainArt(undefined)
        setData(undefined)
        setEnd(false)
        fetchData()
    }

    return (
        <Suspense>
            {end && (
                <Modal
                    title={`Current score: ${score.correct}/${score.incorrect + score.correct}`}
                    description="Your progress will be lost."
                    isOpen={end}
                    onClose={handleRestart}
                    footer={
                        <Button className="w-full" onClick={handleRestart}>
                            Ok
                        </Button>
                    }
                />
            )}

            {exit.press && (
                <Modal
                    title="Are you sure you want to exit?"
                    description="Your progress will be lost."
                    isOpen={exit.press}
                    onClose={() => setExit({ ...exit, press: false })}
                    footer={
                        <>
                            <Button
                                className="w-full"
                                onClick={() =>
                                    setExit({ ...exit, confirm: true })
                                }
                            >
                                Yes
                            </Button>
                            <Button
                                className="w-full"
                                onClick={() =>
                                    setExit({ ...exit, press: false })
                                }
                            >
                                No
                            </Button>
                        </>
                    }
                />
            )}

            {data && mainArt && (
                <section className="w-full max-w-5xl mx-auto h-full grid grid-cols-2 gap-8">
                    <div className="w-full h-full flex flex-col gap-4">
                        <div className="w-full flex gap-4 text-zinc-200 items-center">
                            <p className="font-bold text-nowrap">
                                Select Artistic Movement:
                            </p>
                            <select
                                className="w-full text-zinc-200 font-semibold bg-zinc-900 rounded-sm p-2 outline-none cursor-pointer"
                                onChange={(e) =>
                                    setArtisticMovement(e.target.value)
                                }
                            >
                                {QUIZ_ARTISTIC_MOVEMENTS.map((mov) => (
                                    <option key={mov} value={mov}>
                                        {mov}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <ImageArea
                            artwork={mainArt}
                            handleImageLoaded={handleImageLoaded}
                        />
                    </div>

                    <div className="w-full h-full flex flex-col gap-8">
                        <div className="w-full flex gap-2 items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">
                                Who is the artist?
                            </h2>

                            <p className="text-lg text-gray-400">
                                {score.correct}/
                                {score.incorrect + score.correct}
                            </p>
                        </div>
                        <OptionsMenu
                            key={mainArt.id}
                            artworkOptions={data}
                            correctArtwork={mainArt}
                            handleAnswer={handleAnswer}
                            handleNextQuestion={fetchData}
                            handleExit={handleExit}
                            loading={loading || !imageLoaded}
                        />
                    </div>
                </section>
            )}
        </Suspense>
    )
}

export default QuizGame
