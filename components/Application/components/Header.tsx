import { BiUser } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import { CopyButton, DeleteApplication, UpdateApplication } from 'components'
import { sliceString } from 'utils/stringOperations'
import { NamespaceSchema } from 'interfaces/schemas'
import { MainContext } from 'contexts'
import { useContext } from 'react'

interface HeaderProps {
    uuid: string
    name: string
    namespace: NamespaceSchema
    ownerName: string
    ownerEmail: string
}

const Header = (props: HeaderProps) => {
    const { state } = useContext(MainContext)

    return (
        <div className='relative space-y-2'>
            <div className='font-bold uppercase tracking-wider text-slate-600 dark:text-slate-100'>{sliceString(props.name, 20)}</div>
            <div className='flex items-center font-bold uppercase tracking-wider text-slate-400'>
                <span>{props.namespace.name}</span>
            </div>
            <div className='flex items-center text-slate-400'>
                <BiUser className='mr-4' />
                <span>{props.ownerName}</span>
                <CopyButton value={props.ownerName} colored />
            </div>
            <div className='flex items-center text-slate-400'>
                <AiOutlineMail className='mr-4' />
                <span>{props.ownerEmail}</span>
                <CopyButton value={props.ownerEmail} colored />
            </div>
            {state.user?.email === props.ownerEmail && (
                <div className='absolute top-0 right-0 grid gap-4'>
                    <UpdateApplication initData={{ ...props }} />
                    <DeleteApplication uuid={props.uuid} />
                </div>
            )}
        </div>
    )
}

export default Header
