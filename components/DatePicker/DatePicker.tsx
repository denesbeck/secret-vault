import { useClickOutside, useDatePicker } from 'hooks'
import { Day } from './types'
import { Button, DateSelector, Days, MonthSelector } from './components'

interface DatePickerProps {
    label: string
    storeDateString: (dateString: string) => void
    initialDate?: string
}

const DatePicker = ({ label, storeDateString, initialDate }: DatePickerProps) => {
    const ref = useClickOutside<HTMLDivElement>(() => setSelectorVisible(false))

    const { incrementMonth, decrementMonth, handleSelectDate, currentDate, allDaysInMonth, selectorVisible, setSelectorVisible } =
        useDatePicker(storeDateString, initialDate)

    return (
        <div className='relative h-14 w-full' ref={ref}>
            <Button
                selectorVisible={selectorVisible}
                toggleSelector={() => setSelectorVisible((prevState) => !prevState)}
                currentDate={currentDate}
                label={label}
            />
            {selectorVisible && (
                <div className='absolute bottom-16 z-20 grid h-[18rem] w-full animate-slideInFromBottom grid-cols-7 grid-rows-[9] gap-1 rounded bg-white p-4 font-bold shadow-lg ring-1 ring-blue-300 dark:bg-slate-900'>
                    <MonthSelector incrementMonth={incrementMonth} decrementMonth={decrementMonth} currentDate={currentDate} />
                    <Days />
                    <DateSelector allDaysInMonth={allDaysInMonth as Day[]} currentDate={currentDate} handleSelectDate={handleSelectDate} />
                </div>
            )}
        </div>
    )
}

export default DatePicker
