import { DarkLayout, Shortcut } from 'components'
import { useClickOutside } from 'hooks'
import { ChangeEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useState } from 'react'

interface SearchProps {
    filter: () => void
    syncFilterString?: (newFilterString: string) => void
    label?: string
}

const Search = ({ filter, syncFilterString, label = 'Search...' }: SearchProps) => {
    const [inputVisible, setInputVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const ref = useClickOutside<HTMLInputElement>(() => setInputVisible(false))

    useEffect(() => {
        const keydownEventHandlerEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setInputVisible(false)
            }
        }
        const keydownEventHandlerCtrlB = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'b') {
                setInputVisible((prevState) => !prevState)
            }
        }

        document.addEventListener('keydown', keydownEventHandlerEscape)
        document.addEventListener('keydown', keydownEventHandlerCtrlB)

        return () => {
            document.removeEventListener('keydown', keydownEventHandlerEscape)
            document.removeEventListener('keydown', keydownEventHandlerCtrlB)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!inputVisible) setInputValue('')
    }, [inputVisible])

    const handleSubmit = (e: ReactKeyboardEvent) => {
        if (e.key === 'Enter') {
            if (syncFilterString) syncFilterString(inputValue)
            filter()
            setInputVisible(false)
        }
    }

    return (
        <>
            <button
                className={`flex h-max w-max items-center rounded-full bg-slate-800/20 px-4 py-1.5 text-slate-200 outline-none outline-offset-1 ring-2 ring-slate-200 hover:ring-blue-300 focus-visible:outline-blue-300 ${
                    inputVisible && 'outline-blue-300'
                }`}
                onClick={() => setInputVisible(true)}
            >
                <span className='mr-4 text-sm'>{label}</span>
                <div className='flex items-center space-x-1'>
                    <Shortcut label='Ctrl' />
                    <span className='text-sm'>+</span>
                    <Shortcut label='B' />
                </div>
            </button>
            {inputVisible && (
                <DarkLayout>
                    <div className='relative mb-32 flex h-12 w-[90vw] max-w-[28rem] animate-[textFocus_0.3s_linear] items-center'>
                        <input
                            value={inputValue}
                            onChange={(e: ChangeEvent) => setInputValue((e.target as HTMLInputElement).value)}
                            onKeyDown={handleSubmit}
                            ref={ref}
                            placeholder='Enter something here...'
                            className='h-full w-full rounded bg-white px-4 pr-[8rem] text-slate-800 outline-none ring-2 ring-blue-300 placeholder:text-slate-400 dark:bg-slate-900 dark:text-white'
                            autoFocus
                        />
                        <div className='absolute right-2 flex space-x-2'>
                            <Shortcut label='Enter' />
                            <Shortcut label='Esc' />
                        </div>
                    </div>
                </DarkLayout>
            )}
        </>
    )
}

export default Search
