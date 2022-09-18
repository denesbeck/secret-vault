import { ElementType } from 'react'
import { IconType } from 'react-icons/lib'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface NavItemProps {
    icon: IconType
    label: string
    pathName: string
}

const NavItem = ({ icon, label, pathName }: NavItemProps) => {
    const TheIcon = icon as ElementType
    const router = useRouter()
    return (
        <Link href={pathName}>
            <button
                className={`flex h-max cursor-pointer items-center space-x-2 py-2 outline-offset-4 focus:outline-none focus-visible:outline-blue-300 ${
                    pathName === router.pathname && 'border-b-2 border-b-blue-300'
                } hover:text-slate-300`}
            >
                <TheIcon className='mr-2 h-6 w-6' />
                {label}
            </button>
        </Link>
    )
}

export default NavItem
