import { calculateIncrementMonth } from 'components/DatePicker/utils'

describe('Check whether the month is getting incremented correctly.', () => {
    test('Increment month without changing the year: 2022 March => 2022 April', () => {
        expect(
            calculateIncrementMonth({
                year: 2022,
                month: 2,
                date: 22,
                day: 2,
                formattedDate: '2022-03-22',
            })
        ).toMatchObject({
            year: 2022,
            month: 3,
            date: 1,
            day: 5,
            formattedDate: '2022-04-01',
        })
    })
    test('Increment month without changing the year: 2003 November => 2003 December', () => {
        expect(
            calculateIncrementMonth({
                year: 2003,
                month: 10,
                date: 13,
                day: 4,
                formattedDate: '2003-11-13',
            })
        ).toMatchObject({
            year: 2003,
            month: 11,
            date: 1,
            day: 1,
            formattedDate: '2003-12-01',
        })
    })
    test('Increment month without changing the year: 2010 January => 2010 February', () => {
        expect(
            calculateIncrementMonth({
                year: 2010,
                month: 0,
                date: 3,
                day: 0,
                formattedDate: '2010-01-03',
            })
        ).toMatchObject({
            year: 2010,
            month: 1,
            date: 1,
            day: 1,
            formattedDate: '2010-02-01',
        })
    })
    test('Increment month and with that change the year: 2013 December => 2011 January', () => {
        expect(
            calculateIncrementMonth({
                year: 2013,
                month: 11,
                date: 24,
                day: 2,
                formattedDate: '2013-12-24',
            })
        ).toMatchObject({
            year: 2014,
            month: 0,
            date: 1,
            day: 3,
            formattedDate: '2014-01-01',
        })
    })
    test('Increment month and with that change the year: 2022 December => 2023 January', () => {
        expect(
            calculateIncrementMonth({
                year: 2022,
                month: 11,
                date: 29,
                day: 4,
                formattedDate: '2022-12-29',
            })
        ).toMatchObject({
            year: 2023,
            month: 0,
            date: 1,
            day: 0,
            formattedDate: '2023-01-01',
        })
    })
    test('Increment month and with that change the year: 1999 December => 2000 January', () => {
        expect(
            calculateIncrementMonth({
                year: 1999,
                month: 11,
                date: 10,
                day: 5,
                formattedDate: '1999-12-10',
            })
        ).toMatchObject({
            year: 2000,
            month: 0,
            date: 1,
            day: 6,
            formattedDate: '2000-01-01',
        })
    })
})
