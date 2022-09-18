import { SecretSchema } from 'interfaces/schemas'
import { LinkToEnv, DeleteSecret, UpdateSecret, TagDialog } from 'components'

interface TableActionsProps {
    row: SecretSchema
}

const TableActions = ({ row }: TableActionsProps) => {
    return (
        <div className='flex h-auto w-full items-center space-x-4'>
            <TagDialog uuid={row.uuid} />
            <LinkToEnv uuid={row.uuid} name={row.name} />
            <UpdateSecret
                uuid={row.uuid}
                name={row.name}
                username={row.username}
                password={row.password}
                expirationDate={row.expiration_date}
            />
            <DeleteSecret uuid={row.uuid} />
        </div>
    )
}

export default TableActions
