import { useEffect, useState } from 'react'

const useFilter = (sourceData: any, cols: string[]) => {
    const [result, setResult] = useState(sourceData)

    useEffect(() => {
        setResult(sourceData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sourceData])

    const filter = (searchText: string) => {
        if (!searchText.length) setResult(sourceData)

        const processedData = sourceData.filter((row: any) => {
            let evaluation = false

            for (const prop in row) {
                if (cols.includes(prop) && row[prop].toString().toLowerCase().includes(searchText)) evaluation = true
            }
            return evaluation
        })

        setResult(processedData)
    }

    return { result, filter }
}

export default useFilter
