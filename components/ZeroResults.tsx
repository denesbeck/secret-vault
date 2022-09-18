import { GiVintageRobot } from 'react-icons/gi'
import { AddApplication, AddSecret, Button } from 'components'

interface ZeroResultsProps {
    type: 'secrets' | 'application'
    reset?: () => void
}
const ZeroResults = ({ type, reset }: ZeroResultsProps) => {
    const renderButton = () => {
        switch (type) {
            case 'secrets':
                return <AddSecret first />
            case 'application':
                return <AddApplication first />
        }
    }

    return (
        <div className='flex h-full w-[80%] animate-textFocus flex-col items-center justify-center gap-4 text-slate-800'>
            <div className='flex flex-wrap items-center justify-center gap-4'>
                <GiVintageRobot className='h-24 w-24' />
                <div className='break-words text-center text-2xl'>Server returned zero records.</div>
            </div>
            <div className='grid max-w-[16rem] gap-4'>
                {renderButton()}
                {reset && <Button type='secondary' label='Reset local filters' handler={reset} />}
            </div>
        </div>
    )
}

export default ZeroResults
