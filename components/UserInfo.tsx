import { IconType } from 'react-icons/lib'
import Dropdown from './Dropdown'
import { MainContext } from 'contexts'
import { useContext } from 'react'
import { FaUser } from 'react-icons/fa'

const UserInfo = () => {
    const { state } = useContext(MainContext)
    const items = [
        {
            label: 'Name:',
            value: state.user?.name,
        },
        {
            label: 'Email:',
            value: state.user?.email,
        },
        {
            label: 'Access level:',
            value: 'Admin',
        },
    ]

    return (
        <Dropdown icon={(<FaUser className='h-7 w-4' />) as unknown as IconType}>
            <div className='w-full space-y-2 divide-y divide-slate-200 p-1 '>
                {items.map((item, index: number) => (
                    <div
                        key={index}
                        className='group px-4 py-1 transition-transform duration-150 ease-in-out hover:scale-105 hover:bg-slate-800'
                    >
                        <div className='text-left text-slate-400 group-hover:text-blue-300'>{item.label}</div>
                        <div className='flex break-all text-left text-white'>{item.value}</div>
                    </div>
                ))}
            </div>
        </Dropdown>
    )
}

export default UserInfo
