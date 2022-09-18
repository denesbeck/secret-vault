interface StatusIndicatorProps {
    linked: boolean
}

const StatusIndicator = ({ linked }: StatusIndicatorProps) => {
    return (
        <>
            {linked ? (
                <div className='text-sm font-thin tracking-widest text-blue-400 dark:text-blue-200'>LINKED</div>
            ) : (
                <div className='text-sm font-thin tracking-widest text-pink-800 dark:text-pink-700'>NOT LINKED</div>
            )}
        </>
    )
}

export default StatusIndicator
