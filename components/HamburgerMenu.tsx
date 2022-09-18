import { useClickOutside } from 'hooks'
import { ReactNode, useState } from 'react'
import { FiMenu } from 'react-icons/fi'

interface HamburgerMenuProps {
    children: ReactNode
}

const HamburgerMenu = ({ children }: HamburgerMenuProps) => {
    const [menuVisible, setMenuVisible] = useState(false)

    const ref = useClickOutside<HTMLButtonElement>(() => setMenuVisible(false))

    return (
        <button
            className={`relative h-8 w-8 cursor-pointer rounded border border-slate-100 p-1 hover:bg-slate-700 ${
                menuVisible && 'bg-slate-700'
            }`}
            onClick={() => setMenuVisible((prevState) => !prevState)}
            ref={ref}
        >
            <FiMenu className='h-full w-full' />
            {menuVisible && (
                <div className='absolute right-0 top-10 z-10 w-max animate-slideInFromBottom rounded bg-slate-700 p-2 shadow ring-1 ring-blue-300'>
                    {children}
                </div>
            )}
        </button>
    )
}

export default HamburgerMenu
