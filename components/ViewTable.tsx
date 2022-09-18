import { EnvBadge, SecretField } from 'components'
import { VIEW_METADATA_TYPE, VIEW_OBJECTS, VIEW_OBJECTS_TYPE, VIEW_TYPE } from 'constants/dataTable'
import { IoMdArrowDropright } from 'react-icons/io'

interface ViewTableProps {
    data: any
    currentView: VIEW_TYPE | null
}

const environments = (columnName: string, row: any) => (
    <td key={columnName} className='whitespace-nowrap px-6 py-1.5'>
        <div className='grid gap-2'>
            {row[columnName].map((env: string, index: number) => {
                const separatedValues = env.split('$sep:')
                return (
                    <div className='flex w-full flex-row' key={index}>
                        {!(index > 0 && row[columnName][index - 1].split('$sep:')[1] === separatedValues[1]) ? (
                            <div className='mr-1 flex items-center space-x-1'>
                                <span>{separatedValues[0].toLowerCase()}</span>
                                <IoMdArrowDropright className='h-5 w-5' />
                                <span>{separatedValues[1].toLowerCase()}</span>
                                <IoMdArrowDropright className='h-5 w-5' />
                            </div>
                        ) : (
                            <div className='w-full'></div>
                        )}
                        <EnvBadge readonly name={separatedValues[2]} archetype_uuid={separatedValues[3]} />
                    </div>
                )
            })}
        </div>
    </td>
)

const secrets = (columnName: string, row: any) => (
    <td key={columnName} className='whitespace-nowrap px-6 py-1.5'>
        <div className='grid gap-2'>
            {row[columnName].map((env: string, index: number) => {
                const separatedValues = env.split('$sep:')
                return (
                    <div className='flex w-full flex-row items-center' key={index}>
                        {!(index > 0 && row[columnName][index - 1].split('$sep:')[0] === separatedValues[0]) ? (
                            <div className='mr-1 flex w-full justify-end'>
                                <EnvBadge readonly name={separatedValues[1]} archetype_uuid={separatedValues[2]} />
                            </div>
                        ) : (
                            <div className='w-full'></div>
                        )}
                        <div className='flex items-center space-x-1'>
                            <IoMdArrowDropright className='h-5 w-5' />
                            <span>{separatedValues[3].toLowerCase()}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    </td>
)

const ViewTable = ({ data, currentView }: ViewTableProps) => {
    return (
        <div className='relative block w-max max-w-[90%] animate-slideInFromBottom overflow-y-auto rounded-lg border-2 border-blue-300 bg-gray-100 font-mono shadow dark:bg-gray-800'>
            <table>
                <thead className='sticky top-0 border-b-2 border-blue-300 bg-slate-900 dark:bg-gray-900'>
                    <tr>
                        {(VIEW_OBJECTS[currentView as keyof VIEW_OBJECTS_TYPE] as VIEW_METADATA_TYPE).columns.map((column) => (
                            <th
                                key={column.name}
                                className='cursor-pointer select-none px-6 py-2 text-left text-sm font-medium uppercase tracking-wider text-gray-300 hover:bg-gray-300 hover:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-300'
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200'>
                    {data &&
                        data.map((row: any, index: number) => (
                            <tr
                                key={index}
                                className={`group even:bg-slate-300 hover:bg-slate-600 hover:text-white dark:even:bg-blue-600 dark:even:bg-opacity-10 dark:hover:bg-gray-600 dark:hover:text-white`}
                            >
                                {(VIEW_OBJECTS[currentView as keyof VIEW_OBJECTS_TYPE] as VIEW_METADATA_TYPE).columns.map((column: any) => {
                                    if (column.name === 'environments') return environments(column.name, row)
                                    if (column.name === 'secrets') return secrets(column.name, row)

                                    if (currentView === ('my-secrets' as VIEW_TYPE) && column.name === 'name') {
                                        return (
                                            <td key={column.name} className='flex items-center space-x-1 whitespace-nowrap px-6 py-1.5'>
                                                {column.isSecret ? <SecretField copyButton value={row[column.name]} /> : row[column.name]}
                                                <IoMdArrowDropright className='h-5 w-5' />
                                            </td>
                                        )
                                    }
                                    return (
                                        <td key={column.name} className='whitespace-nowrap px-6 py-1.5'>
                                            {column.isSecret ? <SecretField copyButton value={row[column.name]} /> : row[column.name]}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default ViewTable
