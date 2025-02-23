import '../styles/button.css'

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    loading?: boolean
    skeleton?: boolean
}

const Button = ({ children, loading, skeleton, ...props }: IButton) => {
    return (
        <button
            {...props}
            disabled={loading || props.disabled}
            className={`text-zinc-100 text-md font-semibold bg-transparent border border-zinc-800 py-2 px-6 rounded-md cursor-pointer transition-colors hover:bg-zinc-800 ${props.className} ${loading || props.disabled || skeleton ? 'pointer-events-none' : ''} ${skeleton ? 'relative' : ''}`}
        >
            {children && !loading && children}
            {loading && (
                <div className="w-3.5 h-3.5 flex m-1.5 rounded-full mx-auto border-2 border-t-zinc-100 border-l-zinc-100 border-b-transparent border-r-transparent animate-spin" />
            )}

            {skeleton && <div className="button-skeleton" />}
        </button>
    )
}

export default Button
