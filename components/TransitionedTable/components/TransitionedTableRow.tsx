import { SecretField, StatusIndicator, TableActions, TagsHead } from 'components'
import { MainContext } from 'contexts'
import { SecretSchema } from 'interfaces/schemas'
import { useContext } from 'react'
import { sliceString } from 'utils/stringOperations'

interface TransitionedTableRowProps {
    rowData: SecretSchema
}

const TransitionedTableRow = ({ rowData }: TransitionedTableRowProps) => {
    const { state } = useContext(MainContext)

    const rowMap = [
        {
            label: 'NAME',
            content: <div>{sliceString(rowData.name, 20)}</div>,
        },
        {
            label: 'API KEY',
            content: <SecretField copyButton={rowData.owner_email === state.user?.email} value={rowData.api_key} />,
        },

        {
            label: 'OWNER_NAME',
            content: <div>{rowData.owner_name}</div>,
        },
        {
            label: 'USERNAME',
            content: <div>{rowData.username}</div>,
        },
        {
            label: 'PASSWORD',
            content: <SecretField copyButton={rowData.owner_email === state.user?.email} value={rowData.password} />,
        },
        {
            label: 'EXPIRATION DATE',
            content: <div>{rowData.expiration_date}</div>,
        },
        {
            label: 'TAGS',
            content: <TagsHead tags={rowData.tags} />,
        },
        {
            label: 'STATUS',
            content: (
                <div>
                    <StatusIndicator linked={!!rowData.environments?.length} />
                </div>
            ),
        },
    ]
    return (
        <div className='grid w-[26rem] animate-slideInFromBottom gap-y-1 rounded-md bg-white p-4 text-gray-800 ring ring-blue-300 dark:bg-gray-800 dark:text-gray-200'>
            {rowData.owner_email === state.user?.email && (
                <div className='col-span-full mb-4 justify-self-end'>
                    <TableActions row={rowData} />
                </div>
            )}
            {rowMap.map((row, index: number) => (
                <div
                    key={index}
                    className='group grid grid-cols-2 py-0.5 px-4 even:bg-slate-300 hover:bg-slate-600 hover:text-white dark:even:bg-blue-600/10 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                    <div className='font-medium uppercase tracking-wider text-slate-600 group-hover:text-slate-300 dark:text-slate-300'>
                        {row.label}
                    </div>
                    {row.content}
                </div>
            ))}
        </div>
    )
}

export default TransitionedTableRow
