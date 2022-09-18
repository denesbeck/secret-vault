import { useClickOutside } from 'hooks'
import { ReactNode, useState } from 'react'
import { DropdownContext } from 'contexts'
import { IconType } from 'react-icons/lib'

interface DropdownProps {
    children: ReactNode
    disabled?: boolean
    label?: string
    icon?: IconType
    formMode?: boolean
    menuPosition?: 'tr' | 'tl' | 'br' | 'bl'
    menuContainer?: boolean
}

const Dropdown = ({
    children,
    disabled = false,
    label,
    icon,
    formMode = false,
    menuPosition = 'br',
    menuContainer = true,
}: DropdownProps) => {
    const [menuVisible, setMenuVisible] = useState(false)

    const ref = useClickOutside<HTMLButtonElement>(() => setMenuVisible(false))

    const height = formMode ? 16 : 10
    const menuPositionString = {
        tr: 'right-0 bottom-' + height,
        tl: 'left-0 bottom-' + height,
        br: 'right-0 top-' + height,
        bl: 'left-0 top-' + height,
    }

    const menu = menuContainer ? (
        <div
            className={`absolute ${menuPositionString[menuPosition]} ${
                formMode ? 'bg-white text-lg dark:bg-slate-800' : 'bg-slate-800'
            } z-20 grid w-max animate-slideInFromBottom rounded p-3 shadow-md ring-1 ring-blue-300`}
        >
            <DropdownContext.Provider value={{ closeMenu: () => setMenuVisible(false) }}>{children}</DropdownContext.Provider>
        </div>
    ) : (
        <div className={`absolute ${menuPositionString[menuPosition]} -right-14 z-30 grid h-max w-max animate-slideInFromBottom px-4`}>
            <DropdownContext.Provider value={{ closeMenu: () => setMenuVisible(false) }}>{children}</DropdownContext.Provider>
        </div>
    )

    return (
        <button
            ref={ref}
            className={`relative cursor-pointer ${
                icon ? 'rounded-full ring-slate-700' : 'rounded ring-transparent'
            } px-2 py-0.5 outline-none outline-offset-2 ring-1 transition-all duration-150 ease-in-out focus-visible:outline-blue-300 ${
                menuVisible && 'outline-blue-300 dark:bg-slate-700'
            } ${formMode ? 'h-14 w-full border border-slate-400 text-left' : 'text-center hover:bg-slate-700'}`}
            onClick={() => setMenuVisible((prevState) => !prevState)}
            disabled={disabled}
        >
            <>
                {icon || label}
                {menuVisible && menu}
            </>
        </button>
    )
}

export default Dropdown
