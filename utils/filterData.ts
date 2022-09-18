export const filterData = (sourceData: any, searchText: string, cols: string[]) => {
    if (!searchText.length) return sourceData

    return sourceData.filter((row: any) => {
        let evaluation = false

        for (const prop in row) {
            if (cols.includes(prop) && row[prop].toString().toLowerCase().includes(searchText)) evaluation = true
        }
        return evaluation
    })
}
