import { GiVintageRobot } from 'react-icons/gi'

const NoRecords = () => {
    return (
        <div className='flex w-full items-center justify-center gap-10 py-1'>
            <GiVintageRobot className='h-14 w-14' />
            <div>No records found for the search criteria entered.</div>
        </div>
    )
}

export default NoRecords
