import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { CurrentDate } from '../types'
import { MONTHS } from '../utils'

interface MonthSelectorProps {
    decrementMonth: () => void
    incrementMonth: () => void
    currentDate: CurrentDate
}

const MonthSelector = ({ decrementMonth, incrementMonth, currentDate }: MonthSelectorProps) => {
    return (
        <div className='col-span-full flex w-full items-center'>
            <button
                className='rounded-full text-slate-600 outline-none outline-offset-2 hover:text-slate-400 focus-visible:outline-blue-300 dark:text-slate-300 dark:hover:text-white'
                onClick={decrementMonth}
            >
                <AiOutlineArrowLeft />
            </button>
            <div className='mx-auto cursor-pointer select-none text-center text-slate-600 hover:text-slate-400 dark:text-slate-300 dark:hover:text-white'>{`${
                MONTHS[currentDate.month]
            } ${currentDate.year}`}</div>
            <button
                className='rounded-full text-slate-600 outline-none outline-offset-2 hover:text-slate-400 focus-visible:outline-blue-300 dark:text-slate-300 dark:hover:text-white'
                onClick={incrementMonth}
            >
                <AiOutlineArrowRight />
            </button>
        </div>
    )
}

export default MonthSelector
