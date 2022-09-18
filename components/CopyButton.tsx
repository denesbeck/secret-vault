import { NotificationManager } from 'react-notifications'
import { BiCopy } from 'react-icons/bi'
import { IconType } from 'react-icons/lib'
import { ElementType } from 'react'

interface CopyButtonProps {
    value: string
    icon?: IconType
    infoText?: string
    colored?: boolean
}

const CopyButton = ({ value, icon, infoText, colored = false }: CopyButtonProps) => {
    const TheIcon = icon as ElementType
    return (
        <button
            className={`${
                colored && 'text-blue-400 dark:text-blue-200'
            } ml-2 h-5 w-5 rounded-full outline-none outline-offset-2 transition-transform duration-200 ease-in-out hover:scale-110 focus-visible:outline-blue-300`}
            onClick={() => {
                NotificationManager.info(infoText || 'Copied to clipboard!')
                navigator.clipboard.writeText(value)
            }}
        >
            {icon ? <TheIcon className='h-4 w-4' /> : <BiCopy className='h-full w-full' />}
        </button>
    )
}

export default CopyButton
