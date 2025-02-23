import Button from '../../../../../components/Button'
import '../../../../../styles/button.css'

const Skeleton = () => {
    return (
        <div className="w-full flex flex-col gap-8 ">
            <ul className="w-full h-full flex flex-col gap-2 list-none">
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={index}>
                        <Button
                            skeleton
                            className={`w-full relative h-11 overflow-hidden`}
                        >
                            <></>
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Skeleton
