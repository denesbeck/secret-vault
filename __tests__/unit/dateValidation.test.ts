import { validateDate } from 'components/DatePicker/utils'

describe('Check if the date input has allowed format (e.g. YYYY-MM-DD) where M < 10', () => {
    test('Test with allowed format YYYY-MM-DD, MM < 10 && DD < 10', () => {
        expect(validateDate('2026-07-05')).toBeTruthy()
    })
    test('Test with allowed format YYYY-MM-DD, MM < 10 && 10 < DD < 20', () => {
        expect(validateDate('1992-07-13')).toBeTruthy()
    })
    test('Test with allowed format YYYY-MM-DD, MM < 10 && 20 < DD < 30', () => {
        expect(validateDate('2022-09-26')).toBeTruthy()
    })
    test('Test with allowed format YYYY-MM-DD, MM < 10 && DD = 10', () => {
        expect(validateDate('2002-01-10')).toBeTruthy()
    })
    test('Test with allowed format YYYY-MM-DD, MM < 10 && DD = 20', () => {
        expect(validateDate('1987-03-20')).toBeTruthy()
    })
    test('Test with allowed format YYYY-MM-DD, MM < 10 && DD = 30', () => {
        expect(validateDate('2015-06-30')).toBeTruthy()
    })
})
describe('Check if the date input has allowed format (e.g. YYYY-MM-DD) where M > 10', () => {
    test('Test with allowed format YYYY-MM-DD, MM > 10 && DD < 10', () => {
        expect(validateDate('2020-11-09')).toBeTruthy()
    })
    test('Test with allowed format YYYY-MM-DD, MM > 10 && 10 < DD < 20', () => {
        expect(validateDate('2003-11-19')).toBeTruthy()
    })
    test('Test with allowed format YYYY-MM-DD, MM < 10 && 20 < DD < 30', () => {
        expect(validateDate('2022-10-26')).toBeTruthy()
    })
    test('Test with allowed format YYYY-MM-DD, MM < 10 && DD = 10', () => {
        expect(validateDate('2011-12-10')).toBeTruthy()
    })
    test('Test with allowed format YYYY-MM-DD, MM < 10 && DD = 20', () => {
        expect(validateDate('1987-12-20')).toBeTruthy()
    })
    test('Test with allowed format YYYY-MM-DD, MM < 10 && DD = 30', () => {
        expect(validateDate('2015-10-30')).toBeTruthy()
    })
})
describe('Validate dates with not allowed format.', () => {
    test('Format: MM/DD/YYYY', () => {
        expect(validateDate('02/16/2015')).toBeFalsy()
    })
    test('Format: YYYY.MM.DD', () => {
        expect(validateDate('1988.12.24')).toBeFalsy()
    })
    test('Format: YYYY-M-D', () => {
        expect(validateDate('2007-5-9')).toBeFalsy()
    })
    test('Format: YYYY-M-D', () => {
        expect(validateDate('2013-1-13')).toBeFalsy()
    })
    test('Format: YYYY-M-D', () => {
        expect(validateDate('1999-11-2')).toBeFalsy()
    })
})
describe('Check if the date contains illegal date value.', () => {
    test('Illegal date value: 2015-02-31', () => {
        expect(validateDate('2015-02-31')).toBeFalsy()
    })
    test('Illegal date value: 1990-06-31', () => {
        expect(validateDate('1990-06-31')).toBeFalsy()
    })
    test('Illegal date value: 2022-02-29', () => {
        expect(validateDate('2022-02-29')).toBeFalsy()
    })
    test('Illegal date value: 1992-11-31', () => {
        expect(validateDate('1992-11-31')).toBeFalsy()
    })
    // null and undefined cannot be assigned as the function expects 1 string param
    test('Illegal date value: empty string', () => {
        expect(validateDate('')).toBeFalsy()
    })
})
