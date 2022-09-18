import { calculateDecrementMonth } from 'components/DatePicker/utils'

describe('Check whether the month is getting incremented correctly.', () => {
    test('Decrement month without changing the year: 2022 March => 2022 February', () => {
        expect(
            calculateDecrementMonth({
                year: 2022,
                month: 2,
                date: 22,
                day: 2,
                formattedDate: '2022-03-22',
            })
        ).toMatchObject({
            year: 2022,
            month: 1,
            date: 1,
            day: 2,
            formattedDate: '2022-02-01',
        })
    })
    test('Decrement month without changing the year: 2003 November => 2003 October', () => {
        expect(
            calculateDecrementMonth({
                year: 2003,
                month: 10,
                date: 13,
                day: 4,
                formattedDate: '2003-11-13',
            })
        ).toMatchObject({
            year: 2003,
            month: 9,
            date: 1,
            day: 3,
            formattedDate: '2003-10-01',
        })
    })
    test('Decrement month without changing the year: 2010 February => 2010 January', () => {
        expect(
            calculateDecrementMonth({
                year: 2010,
                month: 1,
                date: 3,
                day: 0,
                formattedDate: '2010-02-03',
            })
        ).toMatchObject({
            year: 2010,
            month: 0,
            date: 1,
            day: 5,
            formattedDate: '2010-01-01',
        })
    })
    test('Decrement month and with that change the year: 2013 January => 2012 December', () => {
        expect(
            calculateDecrementMonth({
                year: 2013,
                month: 0,
                date: 24,
                day: 4,
                formattedDate: '2013-01-24',
            })
        ).toMatchObject({
            year: 2012,
            month: 11,
            date: 1,
            day: 6,
            formattedDate: '2012-12-01',
        })
    })
    test('Decrement month and with that change the year: 2022 December => 2023 January', () => {
        expect(
            calculateDecrementMonth({
                year: 2022,
                month: 0,
                date: 29,
                day: 6,
                formattedDate: '2022-01-29',
            })
        ).toMatchObject({
            year: 2021,
            month: 11,
            date: 1,
            day: 3,
            formattedDate: '2021-12-01',
        })
    })
    test('Decrement month and with that change the year: 1999 December => 2000 January', () => {
        expect(
            calculateDecrementMonth({
                year: 1999,
                month: 0,
                date: 10,
                day: 0,
                formattedDate: '1999-01-10',
            })
        ).toMatchObject({
            year: 1998,
            month: 11,
            date: 1,
            day: 2,
            formattedDate: '1998-12-01',
        })
    })
})
