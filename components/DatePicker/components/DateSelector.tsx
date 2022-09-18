import { CurrentDate, Day } from '../types'

interface DateSelectorProps {
    allDaysInMonth: Day[]
    currentDate: CurrentDate
    handleSelectDate: (date: number, day: number) => void
}

const DateSelector = ({ allDaysInMonth, currentDate, handleSelectDate }: DateSelectorProps) => {
    return (
        <>
            {allDaysInMonth.map((dayInMonth: Day) => {
                return (
                    <button
                        onClick={() => handleSelectDate(dayInMonth.date, dayInMonth.day)}
                        key={dayInMonth.date}
                        style={{ gridColumnStart: dayInMonth.day + 1 }}
                        className={`flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-full text-slate-400 outline-none outline-offset-1 hover:bg-slate-400 hover:text-slate-100 focus-visible:outline-blue-300 ${
                            currentDate.date === dayInMonth.date && ' bg-blue-300 text-slate-600'
                        }`}
                    >
                        {dayInMonth.date}
                    </button>
                )
            })}
        </>
    )
}

export default DateSelector
