import { CurrentDate, Day } from 'components/DatePicker/types'
import { useEffect, useMemo, useState } from 'react'
import {
    formatDate,
    validateDate,
    calculateAllDaysInMonth,
    calculateIncrementMonth,
    calculateDecrementMonth,
} from 'components/DatePicker/utils'
import { NotificationManager } from 'react-notifications'

const TODAY = new Date()

const useDatePicker = (storeDateString: (dateString: string) => void, initDate?: string) => {
    const applyInitialDate = (dateString: string) => {
        const validatedDate = validateDate(dateString)

        if (!validatedDate) return NotificationManager.error('Something went wrong! Init date value validation failed. Please contact IT.')

        setCurrentDate({
            year: validatedDate.getFullYear(),
            month: validatedDate.getMonth(),
            date: validatedDate.getDate(),
            day: validatedDate.getDay(),
            formattedDate: dateString,
        })
    }

    useEffect(() => {
        if (initDate) applyInitialDate(initDate)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [currentDate, setCurrentDate] = useState({
        year: TODAY.getFullYear(),
        month: TODAY.getMonth(),
        date: TODAY.getDate(),
        day: TODAY.getDay(),
        formattedDate: formatDate(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()) || '',
    })

    const [selectorVisible, setSelectorVisible] = useState(false)
    const [allDaysInMonth, setAllDaysInMonth] = useState<Day[]>()

    const getAllDaysInMonthMemo = useMemo(
        () => (year: number, month: number) => {
            const dates = calculateAllDaysInMonth(year, month)
            setAllDaysInMonth(dates)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentDate]
    )

    useEffect(() => {
        if (currentDate) {
            // prepares data for the date selector
            getAllDaysInMonthMemo(currentDate.year, currentDate.month)
            // stores the formatted current date in the inputData state located in the InputDialog component
            storeDateString(currentDate.formattedDate)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDate])

    const incrementMonth = () => setCurrentDate(calculateIncrementMonth(currentDate) as CurrentDate)

    const decrementMonth = () => setCurrentDate(calculateDecrementMonth(currentDate) as CurrentDate)

    const formatDateMemo = useMemo(
        () => formatDate,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentDate]
    )

    const handleSelectDate = (date: number, day: number) => {
        const formattedDate = formatDateMemo(currentDate.year, currentDate.month, date)

        if (!formattedDate)
            return NotificationManager.error('Something went wrong! Illegal date value was sent to be formatted. Please contact IT.')

        setCurrentDate({
            year: currentDate.year,
            month: currentDate.month,
            date: date,
            day: day,
            formattedDate: formattedDate,
        })
        setSelectorVisible(false)
    }

    return {
        incrementMonth,
        decrementMonth,
        handleSelectDate,
        currentDate,
        allDaysInMonth,
        selectorVisible,
        setSelectorVisible,
    }
}

export default useDatePicker
