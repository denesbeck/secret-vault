import { TransitionedTableRow } from './components'
import { SecretSchema } from 'interfaces/schemas'

interface TransitionedTableProps {
    data: SecretSchema[]
}

const TransitionedTable = ({ data }: TransitionedTableProps) => {
    return (
        <div className='grid w-full grid-cols-fluid justify-items-center gap-10 xl:hidden'>
            {data.map((row, index: number) => (
                <TransitionedTableRow key={index} rowData={row} />
            ))}
        </div>
    )
}

export default TransitionedTable
