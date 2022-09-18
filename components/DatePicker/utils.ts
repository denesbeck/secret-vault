import moment from 'moment'
import { CurrentDate } from './types'

export const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// date format: YYYY-MM-DD
export const formatDate = (year: number, month: number, date: number) => {
    // for validation month needs to be incremented by 1 as the indexing starts from 0
    const illegalDateValue = moment([year, month + 1, date], 'YYYY-MM-DD').isValid()
    if (!illegalDateValue) return false

    return `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`
}

export const validateDate = (dateString: string) => {
    if (!dateString) return false

    const isFormatCorrect = dateString.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12]\d|3[01])$/g)
    if (!isFormatCorrect) return false

    const illegalDateValue = moment(dateString, 'YYYY-MM-DD').isValid()
    if (!illegalDateValue) return false

    return new Date(dateString)
}

export const calculateAllDaysInMonth = (year: number, month: number) => {
    // month indexing starts from 0 (e.g. 0 = January, 5 = June, 11 = December)
    const date = new Date(year, month, 1)
    const dates = []

    while (date.getMonth() === month) {
        // day indexing: 0-6 (Su-Sa)
        dates.push({ day: date.getDay(), date: date.getDate() })
        date.setDate(date.getDate() + 1)
    }
    return dates
}

export const calculateIncrementMonth = (currentDate: CurrentDate) => {
    const newDate = { ...currentDate }
    // whenever we switch month the date to be set to 1 just to avoid auto-selecting a date in the selected month that doesn't exist
    newDate.date = 1

    // if the next month is not in the next year
    if (newDate.month + 1 < 12) {
        newDate.month = newDate.month + 1

        const date = new Date(newDate.year, newDate.month, newDate.date)
        newDate.day = date.getDay()

        newDate.formattedDate = formatDate(newDate.year, newDate.month, newDate.date) as string

        return newDate
    }

    // if the next month is in the next year
    if (newDate.month + 1 === 12) {
        newDate.month = 0
        newDate.year = newDate.year + 1

        const date = new Date(newDate.year, newDate.month, newDate.date)
        newDate.day = date.getDay()

        newDate.formattedDate = formatDate(newDate.year, newDate.month, newDate.date) as string

        return newDate
    }
}

export const calculateDecrementMonth = (currentDate: CurrentDate) => {
    const newDate = { ...currentDate }
    // whenever we switch month the date to be set to 1 just to avoid auto-selecting a date in the selected month that doesn't exist
    newDate.date = 1

    // if the previous month is not in the previous year
    if (newDate.month - 1 > -1) {
        newDate.month = newDate.month - 1

        const date = new Date(newDate.year, newDate.month, newDate.date)
        newDate.day = date.getDay()

        newDate.formattedDate = formatDate(newDate.year, newDate.month, newDate.date) as string

        return newDate
    }

    // if the previous month is in the previous year
    if (newDate.month - 1 === -1) {
        newDate.month = 11
        newDate.year = newDate.year - 1

        const date = new Date(newDate.year, newDate.month, newDate.date)
        newDate.day = date.getDay()

        newDate.formattedDate = formatDate(newDate.year, newDate.month, newDate.date) as string

        return newDate
    }
}
