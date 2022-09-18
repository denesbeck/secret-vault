export const groupBy = (data: any, groupByKey: string) => {
    return data.reduce((previousValue: any, currentValue: any) => {
        const key = currentValue[groupByKey]
        ;(previousValue[key] = previousValue[key] || []).push(currentValue)
        return previousValue
    }, {})
}
