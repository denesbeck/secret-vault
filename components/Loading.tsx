import DarkLayout from './DarkLayout'
function Loading() {
    return (
        <DarkLayout>
            <div className='fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 space-x-4'>
                <div className='relative top-9 h-4 w-4 animate-[jumpingDots_1.2s_infinite] rounded-full bg-slate-900'></div>
                <div className='relative top-9 h-4 w-4 animate-[jumpingDots_1.2s_0.4s_infinite] rounded-full bg-blue-300'></div>
                <div className='relative top-9 h-4 w-4 animate-[jumpingDots_1.2s_0.8s_infinite] rounded-full bg-slate-100'></div>
            </div>
        </DarkLayout>
    )
}

export default Loading
