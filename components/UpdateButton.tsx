import { BsPencilFill } from 'react-icons/bs'

interface UpdateButtonProps {
    handler: () => void
    colored?: boolean
}

const UpdateButton = ({ handler, colored = false }: UpdateButtonProps) => {
    return (
        <button
            onClick={handler}
            className={`h-4 w-4 rounded-full outline-none outline-offset-4 transition-transform duration-200 ease-in-out hover:scale-110 focus-visible:outline-blue-300 ${
                colored && 'text-blue-300'
            }`}
        >
            <BsPencilFill className='h-full w-full' />
        </button>
    )
}

export default UpdateButton
