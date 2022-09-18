import { BsFillCalendar2Fill } from 'react-icons/bs'
import { CurrentDate } from '../types'

interface ButtonProps {
    label: string
    selectorVisible: boolean
    toggleSelector: () => void
    currentDate: CurrentDate
}

const Button = ({ label, selectorVisible, toggleSelector, currentDate }: ButtonProps) => {
    return (
        <button
            className={`relative h-full w-full cursor-pointer rounded-md border border-slate-400 pl-2 text-left outline-none outline-offset-2 focus-visible:outline-blue-300 ${
                selectorVisible && 'outline-blue-300'
            }`}
            onClick={toggleSelector}
        >
            <label className={`absolute top-1 text-xs text-slate-400 ${selectorVisible && 'text-blue-300'}`}>{label}</label>
            <div className='relative top-2 flex space-x-2'>
                <BsFillCalendar2Fill className='relative top-0.5 h-4 w-4 text-slate-400' />
                <label className='cursor-pointer'>{currentDate.formattedDate}</label>
            </div>
        </button>
    )
}

export default Button
