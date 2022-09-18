import { createContext } from 'react'

type DropdownContextProps = {
    closeMenu: () => void
}

const DropdownContext = createContext<DropdownContextProps>({
    closeMenu: () => undefined,
})

export default DropdownContext
