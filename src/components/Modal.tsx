import '../styles/modal.css'

interface IModal {
    title: string
    description: string

    isOpen: boolean
    onClose: () => void

    footer?: React.ReactNode
}

const Modal = ({ title, description, isOpen, onClose, footer }: IModal) => {
    if (!isOpen) return null

    return (
        <button
            disabled={!isOpen}
            onClick={onClose}
            className="w-full h-full bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 flex justify-center items-center"
        >
            <div
                className={`${isOpen ? 'animate-modal' : ''} bg-zinc-950 text-white p-8 border border-zinc-800 rounded-md flex flex-col gap-8`}
            >
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-zinc-100 text-center">
                        {title}
                    </h2>
                    <p className="text-zinc-400 text-center text-md">
                        {description}
                    </p>
                </div>

                {footer && (
                    <div className="flex justify-center items-center gap-4">
                        {footer}
                    </div>
                )}
            </div>
        </button>
    )
}

export default Modal
