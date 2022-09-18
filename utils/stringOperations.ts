export const sliceString = (inputString: string, length: number) => {
    if (!inputString) return ''
    return inputString.slice(0, length) + (inputString.length > length ? '...' : '')
}
