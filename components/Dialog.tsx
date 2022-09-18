import { useClickOutside } from 'hooks'
import Button from './Button'
import DarkLayout from './DarkLayout'
import { BsExclamationCircle } from 'react-icons/bs'

interface DialogProps {
    message: string
    handler: () => void
    close: () => void
}

const Dialog = ({ message, handler, close }: DialogProps) => {
    const ref = useClickOutside<HTMLDivElement>(close)

    return (
        <DarkLayout>
            <div
                ref={ref}
                className='flex w-full max-w-[24rem] animate-slideInFromBottom items-start gap-4 rounded-lg border-blue-300 bg-white p-6 text-slate-800 ring-1 ring-blue-300 dark:bg-slate-900 dark:text-slate-200'
            >
                <BsExclamationCircle className='mt-1 h-max w-20 text-pink-800' />
                <div>
                    <div>{message}</div>
                    <div className='mt-6 flex gap-4'>
                        <Button type='danger' label='Confirm' handler={handler} />
                        <Button type='secondary' label='Cancel' handler={close} />
                    </div>
                </div>
            </div>
        </DarkLayout>
    )
}

export default Dialog
