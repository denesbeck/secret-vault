import { DAYS } from '../utils'

const Days = () => {
    return (
        <>
            {DAYS.map((day: string, index: number) => (
                <div
                    key={index}
                    className='flex h-full w-full select-none items-center justify-center text-slate-600 hover:text-slate-400 dark:text-slate-500 dark:hover:text-white'
                >
                    {day}
                </div>
            ))}
        </>
    )
}

export default Days
