import { DropdownContext } from 'contexts'
import { useContext } from 'react'
import { IoIosArrowForward } from 'react-icons/io'

interface NamespaceProps {
    label: string
    handler: () => void
}
const Namespace = ({ label, handler }: NamespaceProps) => {
    const { closeMenu } = useContext(DropdownContext)

    return (
        <span
            tabIndex={0}
            className='group flex w-full cursor-pointer items-center space-x-2 border-b-2 border-transparent py-1.5 px-2 outline-none transition-all duration-150 ease-in-out hover:scale-110 hover:bg-slate-900 hover:text-slate-300 focus-visible:border-blue-300'
            onClick={handler}
            onKeyDown={(e) => {
                if (e.code === 'Enter') {
                    handler()
                    closeMenu()
                }
            }}
        >
            <IoIosArrowForward className='group-hover:text-blue-300' />
            <div>
                <span className='group-hover:text-blue-300'>_</span>
                {label}
            </div>
        </span>
    )
}

export default Namespace
