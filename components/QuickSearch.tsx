import { ChangeEvent } from 'react'

interface QuickSearchProps {
    filter: (value: string) => void
}

const QuickSearch = ({ filter }: QuickSearchProps) => {
    return (
        <input
            onChange={(e: ChangeEvent) => filter((e.target as HTMLInputElement).value)}
            placeholder='Enter something here...'
            className='h-8 w-2/3 border-b border-slate-400 bg-transparent outline-none'
        />
    )
}

export default QuickSearch
