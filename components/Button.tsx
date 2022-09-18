import { ElementType } from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
    type: 'primary' | 'secondary' | 'danger'
    label: string
    icon?: IconType
    handler?: () => void
    disabled?: boolean
}

const BUTTON_TYPES = {
    primary: 'bg-blue-400 hover:bg-blue-500',
    secondary: 'bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600',
    danger: 'bg-pink-800 hover:bg-pink-700',
}

const Button = ({ type, label, icon, handler, disabled = false }: ButtonProps) => {
    const TheIcon = icon as ElementType

    return (
        <button
            disabled={disabled}
            className={`${BUTTON_TYPES[type]} flex w-full items-center justify-center space-x-2 rounded-full px-4 py-2 font-medium text-slate-200 outline-none outline-offset-2 focus-visible:outline-blue-300`}
            onClick={handler}
        >
            {icon && <TheIcon className='h-6 w-6' />}
            <div>{label}</div>
        </button>
    )
}

export default Button
