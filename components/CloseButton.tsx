import { AiOutlineClose } from 'react-icons/ai'

interface CloseButtonProps {
    close: () => void
}

const CloseButton = ({ close }: CloseButtonProps) => {
    return (
        <button
            className='absolute top-1 right-1 h-7 w-7 rounded-full text-slate-200 outline-none outline-offset-2 transition-all duration-500 ease-in-out hover:text-slate-400 focus-visible:outline-blue-300 sm:-top-1 sm:-right-10'
            onClick={close}
        >
            <AiOutlineClose className='h-full w-full' />
        </button>
    )
}

export default CloseButton
