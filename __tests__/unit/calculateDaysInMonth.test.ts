import { calculateAllDaysInMonth } from 'components/DatePicker/utils'

describe('Check if days are calculated correctly in a given month!', () => {
    test('February 2021', () => {
        expect(calculateAllDaysInMonth(2021, 1)).toContainEqual({ day: 1, date: 1 })
        expect(calculateAllDaysInMonth(2021, 1)).toContainEqual({ day: 2, date: 9 })
        expect(calculateAllDaysInMonth(2021, 1)).toContainEqual({ day: 6, date: 13 })
        expect(calculateAllDaysInMonth(2021, 1)).toContainEqual({ day: 0, date: 21 })
        expect(calculateAllDaysInMonth(2021, 1)).toContainEqual({ day: 6, date: 27 })
    })
    calculateAllDaysInMonth(1988, 2)
    test('March 1988', () => {
        expect(calculateAllDaysInMonth(1988, 2)).toContainEqual({ day: 4, date: 3 })
        expect(calculateAllDaysInMonth(1988, 2)).toContainEqual({ day: 1, date: 7 })
        expect(calculateAllDaysInMonth(1988, 2)).toContainEqual({ day: 4, date: 17 })
        expect(calculateAllDaysInMonth(1988, 2)).toContainEqual({ day: 3, date: 23 })
        expect(calculateAllDaysInMonth(1988, 2)).toContainEqual({ day: 4, date: 31 })
    })
    test('June 2001', () => {
        expect(calculateAllDaysInMonth(2001, 5)).toContainEqual({ day: 0, date: 3 })
        expect(calculateAllDaysInMonth(2001, 5)).toContainEqual({ day: 1, date: 11 })
        expect(calculateAllDaysInMonth(2001, 5)).toContainEqual({ day: 2, date: 19 })
        expect(calculateAllDaysInMonth(2001, 5)).toContainEqual({ day: 3, date: 20 })
        expect(calculateAllDaysInMonth(2001, 5)).toContainEqual({ day: 6, date: 30 })
    })
    test('November 2022', () => {
        expect(calculateAllDaysInMonth(2022, 10)).toContainEqual({ day: 3, date: 2 })
        expect(calculateAllDaysInMonth(2022, 10)).toContainEqual({ day: 5, date: 11 })
        expect(calculateAllDaysInMonth(2022, 10)).toContainEqual({ day: 0, date: 13 })
        expect(calculateAllDaysInMonth(2022, 10)).toContainEqual({ day: 5, date: 25 })
        expect(calculateAllDaysInMonth(2022, 10)).toContainEqual({ day: 2, date: 29 })
    })
    test('July 1999', () => {
        expect(calculateAllDaysInMonth(1999, 6)).toContainEqual({ day: 2, date: 6 })
        expect(calculateAllDaysInMonth(1999, 6)).toContainEqual({ day: 6, date: 10 })
        expect(calculateAllDaysInMonth(1999, 6)).toContainEqual({ day: 1, date: 19 })
        expect(calculateAllDaysInMonth(1999, 6)).toContainEqual({ day: 4, date: 22 })
        expect(calculateAllDaysInMonth(1999, 6)).toContainEqual({ day: 5, date: 30 })
    })
})
