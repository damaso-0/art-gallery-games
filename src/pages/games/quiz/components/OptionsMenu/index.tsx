import { useEffect, useState } from 'react'
import type { IArtwork } from '../../../../../interfaces/artworks'
import Button from '../../../../../components/Button'
import Skeleton from './Skeleton'

interface IQuizOptions {
    artworkOptions: IArtwork[]
    correctArtwork: IArtwork
    loading: boolean
    handleAnswer: (answer: 'correct' | 'incorrect') => void
    handleNextQuestion: () => void
    handleExit: () => void
}

/** Quiz options menu */
const OptionsMenu = ({
    artworkOptions,
    correctArtwork,
    loading,
    handleAnswer,
    handleNextQuestion,
    handleExit,
}: IQuizOptions) => {
    const [options] = useState(
        [...artworkOptions].toSorted(() => Math.random() - 0.5)
    )
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
    const [selectedArtwork, setSelectedArtwork] = useState<IArtwork | null>(
        null
    )

    // increment score and show correct answer
    const handleClick = (art: IArtwork) => {
        return () => {
            handleAnswer(art.id === correctArtwork.id ? 'correct' : 'incorrect')
            setShowCorrectAnswer(true)
            setSelectedArtwork(art)
        }
    }

    const getBorderColor = (artwork: IArtwork) => {
        if (showCorrectAnswer && artwork.id === correctArtwork.id) {
            return 'border-green-800!'
        }
        if (showCorrectAnswer && artwork.id !== correctArtwork.id) {
            return 'border-red-800!'
        }
        return 'border-gray-800'
    }

    // get keyboard numbers
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key >= '1' && e.key <= '8') {
                const index = parseInt(e.key) - 1
                handleClick(options[index])()
            }

            if (e.key === 'Escape') handleExit()
            if (e.key === 'Enter') handleNextQuestion()
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    if (loading) return <Skeleton />

    return (
        <div className="w-full flex flex-col gap-8">
            <ul className="w-full h-full flex flex-col gap-2 list-none">
                {options?.map((artwork, index) => (
                    <li key={artwork.id}>
                        <Button
                            loading={loading}
                            onClick={handleClick(artwork)}
                            className={`w-full text-lg text-gray-400 border flex items-center justify-start gap-4 ${getBorderColor(artwork)} p-4 rounded-md cursor-pointer transition-colors hover:bg-zinc-950 ${showCorrectAnswer ? 'pointer-events-none' : ''} ${selectedArtwork?.id === artwork.id ? 'bg-zinc-800' : ''}`}
                        >
                            <div className="text-sm w-5 h-5 flex items-center justify-center m-0 p-0 bg-zinc-400 text-center font-bold text-zinc-800 rounded-full">
                                {index + 1}
                            </div>
                            {artwork.artist_title}
                        </Button>
                    </li>
                ))}
            </ul>

            <div className="w-full flex gap-2 items-center justify-end">
                {showCorrectAnswer && (
                    <Button
                        loading={loading}
                        className="w-3/4"
                        onClick={handleNextQuestion}
                    >
                        Next Question
                    </Button>
                )}
                <Button
                    loading={loading}
                    className="w-1/4 hover:bg-red-950!"
                    onClick={handleExit}
                >
                    Exit
                </Button>
            </div>
        </div>
    )
}

export default OptionsMenu
