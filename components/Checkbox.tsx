import { ChangeEvent } from 'react'

interface CheckboxProps {
    label?: string
    value: boolean
    toggle: (value: boolean) => void
    color?: string
}
const Checkbox = ({
    label = '',
    value,
    toggle,
    color = 'accent-blue-300 hover:accent-blue-400 focus-visible:outline-blue-300 dark:hover:accent-blue-200',
}: CheckboxProps) => {
    return (
        <label className='w-max cursor-pointer select-none text-slate-400 hover:text-slate-500 dark:hover:text-slate-300'>
            <input
                checked={value}
                onChange={(e: ChangeEvent) => toggle((e.target as HTMLInputElement).checked)}
                type='checkbox'
                className={`mr-2 h-4 w-4 cursor-pointer ${color} outline-none outline-offset-1`}
            />
            {label}
        </label>
    )
}

export default Checkbox
