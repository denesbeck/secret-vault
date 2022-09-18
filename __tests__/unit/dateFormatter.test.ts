import { formatDate } from 'components/DatePicker/utils'

describe('Check if the date is formatted correctly with legal date values.', () => {
    test('1997,3,14', () => {
        expect(formatDate(1997, 3, 14)).toBe('1997-04-14')
    })
    test('2011,11,10', () => {
        expect(formatDate(2011, 11, 10)).toBe('2011-12-10')
    })
    test('2032,5,19', () => {
        expect(formatDate(2032, 5, 19)).toBe('2032-06-19')
    })
    test('2021,6,13', () => {
        expect(formatDate(2021, 6, 13)).toBe('2021-07-13')
    })
})
describe('Check the output if the input is an illegal date value.', () => {
    test('765,6,1', () => {
        expect(formatDate(2039, 5, 31)).toBeFalsy()
    })
    test('2022,12,1', () => {
        expect(formatDate(2022, 12, 1)).toBeFalsy()
    })
    test('1966,2,31', () => {
        expect(formatDate(1966, 1, 31)).toBeFalsy()
    })
    test('2002,9,31', () => {
        expect(formatDate(2002, 8, 31)).toBeFalsy()
    })
})
