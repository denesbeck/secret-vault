import { AiOutlinePlus } from 'react-icons/ai'

interface AddButtonProps {
    handler: () => void
    label: string
}

const AddButton = ({ handler, label }: AddButtonProps) => {
    return (
        <button
            className='flex items-center gap-2 text-slate-200 outline-none hover:text-slate-300 focus-visible:text-blue-300'
            onClick={handler}
        >
            <AiOutlinePlus /> <span>{label}</span>
        </button>
    )
}

export default AddButton
