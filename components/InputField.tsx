import { ChangeEvent, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

interface InputFieldProps {
    label: string
    autoFocus?: boolean
    disabled?: boolean
    isPassword?: boolean
    uppercase?: boolean
    value: string
    handler: (value: string) => void
    minLength?: number
    maxLength?: number
}

const InputField = ({
    label,
    autoFocus = false,
    disabled = false,
    isPassword = false,
    uppercase,
    value,
    handler,
    minLength,
    maxLength,
}: InputFieldProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const [isExposed, setIsExposed] = useState(!isPassword)

    const exposeSwitch = (
        <button
            onClick={() => setIsExposed((currentState) => !currentState)}
            className='absolute bottom-2 right-2 z-20 h-7 w-7 rounded-full px-0.5 outline-none outline-offset-2 hover:bg-gray-100 focus-visible:outline-gray-400 dark:hover:bg-slate-700'
        >
            {isExposed ? <FaRegEyeSlash className='h-full w-full' /> : <FaRegEye className='h-full w-full' />}
        </button>
    )

    return (
        <div className='relative grid h-14 w-full'>
            <input
                minLength={minLength}
                maxLength={maxLength}
                autoFocus={autoFocus}
                autoCorrect='off'
                autoComplete='off'
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={uppercase ? value.toUpperCase() : value}
                type={isExposed ? 'text' : 'password'}
                className={`relative z-10 h-full w-full rounded border border-slate-400 bg-transparent px-2 pt-4 font-normal outline-none focus:border-blue-300 disabled:border-transparent disabled:bg-gray-100 disabled:text-gray-400 ${
                    isPassword && 'pr-10'
                }`}
                onChange={(e: ChangeEvent) =>
                    handler(uppercase ? (e.target as HTMLInputElement).value.toUpperCase() : (e.target as HTMLInputElement).value)
                }
            />
            <label
                className={`absolute top-1/4 left-2 block w-full transition-all duration-200 ease-in-out ${
                    (isFocused || value?.length) && '-translate-y-2.5 text-xs'
                } ${isFocused && !disabled ? 'text-blue-300' : 'text-gray-400'} ${disabled && 'z-20 text-gray-400'}`}
            >
                {label}
            </label>
            {isPassword && exposeSwitch}
        </div>
    )
}

export default InputField
