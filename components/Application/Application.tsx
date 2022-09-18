import { Environments, Header } from './components'

interface ApplicationProps {
    uuid: string
    name: string
    ns_uuid: string
    ws_name: string
    owner_name: string
    owner_email: string
}

const Application = ({
    uuid: uuid,
    name: name,
    ns_uuid: wsUuid,
    ws_name: wsName,
    owner_name: ownerName,
    owner_email: ownerEmail,
}: ApplicationProps) => {
    return (
        <div className='h-auto w-[26rem] animate-slideInFromBottom overflow-auto rounded-lg bg-white p-6 ring-2 ring-blue-300 dark:bg-slate-800'>
            <Header uuid={uuid} name={name} namespace={{ uuid: wsUuid, name: wsName }} ownerName={ownerName} ownerEmail={ownerEmail} />
            <Environments appUuid={uuid} ownerEmail={ownerEmail} />
        </div>
    )
}

export default Application
