import { CloseButton, DarkLayout, Title } from 'components'
import { useClickOutside } from 'hooks'
import { ReactNode } from 'react'
import { ButtonGroup } from './components'

interface InputDialogProps {
    children: ReactNode
    title: string
    primaryButtonLabel: string
    close: () => void
    handler: () => void
}

const InputDialog = ({ children, title, primaryButtonLabel, close, handler }: InputDialogProps) => {
    const ref = useClickOutside<HTMLDivElement>(close)

    return (
        <DarkLayout>
            <div
                id='input-dialog'
                ref={ref}
                className='relative flex w-full max-w-[24rem] animate-slideInFromBottom flex-col gap-6 rounded-lg bg-white p-8 shadow-md ring-2 ring-blue-300 dark:bg-slate-900'
            >
                <Title title={title} />
                {children}
                <ButtonGroup primaryButtonLabel={primaryButtonLabel} handler={handler} close={close} />
                <CloseButton close={close} />
            </div>
        </DarkLayout>
    )
}

export default InputDialog
