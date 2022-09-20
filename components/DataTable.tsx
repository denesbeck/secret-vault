import { SecretSchema } from 'interfaces/schemas'
import { NoRecords, SecretField, StatusIndicator, TableActions, TagsHead } from 'components'
import { sliceString } from 'utils/stringOperations'
import { MainContext } from 'contexts'
import { useContext } from 'react'

interface DataTableProps {
    headers: string[]
    data: SecretSchema[]
}

const DataTable = ({ headers, data }: DataTableProps) => {
    const { state } = useContext(MainContext)

    return (
        <div className='relative hidden w-full animate-slideInFromBottom overflow-y-auto rounded-lg border-2 border-blue-300 bg-gray-100 font-mono shadow dark:bg-gray-800 xl:block'>
            <table>
                <thead className='sticky top-0 border-b-2 border-blue-300 bg-slate-900 dark:bg-gray-900'>
                    <tr>
                        <th className='cursor-pointer select-none px-6 py-2 text-left text-sm font-medium uppercase tracking-wider text-gray-300 hover:bg-gray-300 hover:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-300'>
                            {'#'}
                        </th>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className='cursor-pointer select-none px-6 py-2 text-left text-sm font-medium uppercase tracking-wider text-gray-300 hover:bg-gray-300 hover:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-300'
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200'>
                    {data.length ? (
                        data.map((row: SecretSchema, index: number) => (
                            <tr
                                key={index}
                                className={`even:bg-slate-300 hover:bg-slate-600 hover:text-white dark:even:bg-blue-600/10 dark:hover:bg-gray-600 dark:hover:text-white`}
                            >
                                <td className='whitespace-nowrap px-6 py-1.5'>{index + 1}</td>
                                <td className='whitespace-nowrap px-6 py-1.5'>{sliceString(row.name, 20)}</td>
                                <td className='whitespace-nowrap px-6 py-1.5'>
                                    <SecretField copyButton={row.owner_email === state.user?.email} value={row.api_key} />
                                </td>
                                <td className='whitespace-nowrap px-6 py-1.5'>{row.owner_name}</td>
                                <td className='whitespace-nowrap px-6 py-1.5'>{row.username}</td>
                                <td className='whitespace-nowrap px-6 py-1.5'>
                                    <SecretField copyButton={row.owner_email === state.user?.email} value={row.password} />
                                </td>
                                <td className='whitespace-nowrap px-6 py-1.5'>{row.expiration_date}</td>
                                <td className='whitespace-nowrap px-6 py-1.5'>
                                    <TagsHead tags={row.tags} />
                                </td>
                                <td className='whitespace-nowrap px-6 py-1.5'>
                                    <StatusIndicator linked={!!row.environments?.length} />
                                </td>
                                <td className='flex whitespace-nowrap px-6 py-1.5'>
                                    {row.owner_email === state.user?.email ? <TableActions row={row} /> : '-'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <td colSpan={10}>
                            <NoRecords />
                        </td>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable
