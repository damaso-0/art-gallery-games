import Button from '../../../../../components/Button'

/** Quiz Game Score Screen */
interface IScoreScreen {
    correctAnswers: number
    incorrectAnswers: number
}

const ScoreScreen = ({ correctAnswers, incorrectAnswers }: IScoreScreen) => {
    if (!correctAnswers && !incorrectAnswers) return null

    return (
        <section className="w-full flex flex-col items-center justify-center gap-8 pt-[10vh]">
            <h1 className="text-3xl font-bold text-zinc-400">
                Quiz final score
            </h1>
            <p className="text-8xl font-bold text-zinc-200 leading-20 flex gap-1 items-end">
                {correctAnswers}
                <span className="text-5xl text-zinc-800">
                    /{correctAnswers + incorrectAnswers}
                </span>
            </p>

            <div className="w-full max-w-md flex items-center justify-center gap-4">
                <Button
                    className="w-fit"
                    onClick={() => window.location.reload()}
                >
                    Play again
                </Button>

                <a href="/games">
                    <Button className="w-fit">Game list</Button>
                </a>

                <a href="/">
                    <Button className="w-fit">Homepage</Button>
                </a>
            </div>
        </section>
    )
}

export default ScoreScreen
