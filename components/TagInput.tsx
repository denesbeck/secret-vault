import { ALLOWED_TAG_KEYS } from 'constants/allowedTags'
import { useClickOutside } from 'hooks'
import { ChangeEvent, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import DeleteButton from './DeleteButton'

interface TagInputProps {
    tagKey: string | null
    tagValue: string
    updateKey: (key: string) => void
    updateValue: (value: string) => void
    deleteTag: () => void
}

const TagInput = ({ tagKey, tagValue, updateKey, updateValue, deleteTag }: TagInputProps) => {
    const [menuVisible, setMenuVisible] = useState(false)
    const ref = useClickOutside<HTMLDivElement>(() => setMenuVisible(false))

    return (
        <div className='flex flex-wrap items-center gap-4'>
            <div className='relative'>
                <button
                    onClick={() => setMenuVisible((prevState) => !prevState)}
                    className={`flex h-8 w-[10rem] items-center justify-between rounded bg-transparent px-2 text-start text-sm text-slate-800 outline-none ring-1 ring-blue-300 focus-visible:outline-blue-300 dark:text-slate-200 ${
                        menuVisible && 'outline-blue-300'
                    }`}
                >
                    {tagKey || <span className='text-slate-400'>select key...</span>}
                    <BiChevronDown className='h-5 w-5 text-slate-400' />
                </button>
                {menuVisible && (
                    <div ref={ref} className='absolute bottom-9 -right-6 grid animate-slideInFromBottom'>
                        {ALLOWED_TAG_KEYS.map((allowedTagKey: string, index: number) => (
                            <button
                                onClick={() => {
                                    updateKey(allowedTagKey)
                                    setMenuVisible(false)
                                }}
                                key={index}
                                className='group my-1 rounded bg-slate-800 px-2 py-0.5 font-bold text-slate-300 outline-none ring-1 ring-slate-300 transition-all duration-150 ease-in-out hover:translate-x-4 hover:scale-125 hover:bg-slate-800 hover:text-slate-200 hover:ring-2 focus-visible:outline-blue-300 dark:hover:bg-slate-900'
                            >
                                <span className='group-hover:text-blue-300'>{'> _'}</span>
                                {allowedTagKey}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <span className='select-none rounded bg-slate-800 py-0.5 px-2 text-slate-200'>=</span>
            <input
                maxLength={12}
                onChange={(e: ChangeEvent) => updateValue((e.target as HTMLInputElement).value)}
                className='h-8 w-[10rem] rounded bg-transparent px-2 text-sm text-slate-800 outline-none ring-1 ring-blue-300 placeholder:text-slate-400 focus-visible:outline-blue-300 dark:text-slate-200'
                placeholder='value'
                value={tagValue}
            />
            <DeleteButton handler={deleteTag} colored />
        </div>
    )
}

export default TagInput
