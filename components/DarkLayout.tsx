import { createPortal } from 'react-dom'
import { ReactElement } from 'react'

interface DarkLayoutProps {
    children: ReactElement
}

const DarkLayout = ({ children }: DarkLayoutProps) => {
    return createPortal(
        <div className='fixed top-0 left-0 flex h-screen w-screen items-center justify-center overflow-hidden bg-slate-900/40 backdrop-blur-sm'>
            {children}
        </div>,
        document.getElementById('myPortal')!
    )
}

export default DarkLayout
