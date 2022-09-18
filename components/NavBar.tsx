import { FaKey } from 'react-icons/fa'
import { IoIosApps, IoMdSettings } from 'react-icons/io'
import { NavItem, ThemeSwitcher, UserInfo, Namespaces, Dropdown, HamburgerMenu, Checkbox } from 'components'
import MainContext from 'contexts/mainContext'
import { useContext } from 'react'
import Image from 'next/image'
import Logo from 'public/logo.svg'
import { RiListCheck2 } from 'react-icons/ri'
import { NamespaceSchema } from 'interfaces/schemas'
import { MdViewQuilt } from 'react-icons/md'
import { useRouter } from 'next/router'

const ALL_LABEL = 'ALL'

const NavBar = () => {
    const { state, dispatch } = useContext(MainContext)
    const { pathname } = useRouter()
    const navItems = (
        <>
            <NavItem icon={FaKey} label='Secrets' pathName='/secrets' />
            <NavItem icon={IoIosApps} label='Applications' pathName='/applications' />
            <NavItem icon={MdViewQuilt} label='Views' pathName='/views' />
            <NavItem icon={RiListCheck2} label='Reviews' pathName='/reviews' />
            <NavItem icon={IoMdSettings} label='Settings' pathName='/settings' />
        </>
    )

    const calculateLabel = () => {
        if (state.namespaces!.length === 1) return state.namespaces![0].name
        return state.namespaces!.every((ns: NamespaceSchema) => ns.selected)
            ? ALL_LABEL
            : state.namespaces!.find((ns: NamespaceSchema) => ns.selected)!.name
    }

    return (
        <nav className='flex w-full select-none flex-wrap items-center justify-start gap-x-10 gap-y-2 bg-gray-900 px-8 py-2 text-lg text-gray-100'>
            <div className='mr-auto flex gap-x-10'>
                <div className='flex items-center text-2xl'>
                    <div className='mr-4 flex h-[60px] w-[60px] overflow-hidden rounded-full bg-slate-200 pb-2'>
                        <Image src={Logo} width={60} height={60} alt='logo' />
                    </div>
                    <span>Secret</span>
                    <span className='text-slate-400'>|Vault</span>
                </div>
                <div className='block w-full xl:hidden'>
                    <HamburgerMenu>{navItems}</HamburgerMenu>
                </div>
                <div className='hidden gap-x-10 xl:flex'>{navItems}</div>
            </div>

            {state.user && state.namespaces && (
                <div className='flex flex-wrap items-center gap-x-10 gap-y-2'>
                    {(pathname === '/secrets' || pathname === '/applications') && (
                        <>
                            <Checkbox
                                label='Show only records I own'
                                value={state.showOwnedOnly}
                                toggle={(value: boolean) => dispatch({ type: 'SHOW_OWNED_ONLY', payload: value })}
                            />
                            <div className='flex items-center space-x-2'>
                                <label className='text-slate-400'>Namespace:</label>
                                <Dropdown label={calculateLabel()} disabled={state.namespaces.length <= 1}>
                                    <Namespaces allLabel={ALL_LABEL} />
                                </Dropdown>
                            </div>
                        </>
                    )}
                    <ThemeSwitcher />
                    <UserInfo />
                </div>
            )}
        </nav>
    )
}

export default NavBar
