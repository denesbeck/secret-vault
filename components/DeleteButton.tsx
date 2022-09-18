import { BiTrash } from 'react-icons/bi'

interface DeleteButtonProps {
    handler: () => void
    colored?: boolean
}

const DeleteButton = ({ handler, colored = false }: DeleteButtonProps) => {
    return (
        <button
            onClick={handler}
            className='h-5 w-5 rounded-full outline-none outline-offset-2 transition-transform duration-200 ease-in-out hover:scale-110 focus-visible:outline-blue-300'
        >
            <BiTrash className={`h-full w-full ${colored && 'text-pink-800'}`} />
        </button>
    )
}

export default DeleteButton
