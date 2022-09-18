const MiniLoading = () => {
    return (
        <div className='flex scale-50 space-x-2'>
            <div className='relative h-4 w-4 animate-[jumpingDots_1.2s_infinite] rounded-full bg-slate-900'></div>
            <div className='relative h-4 w-4 animate-[jumpingDots_1.2s_0.4s_infinite] rounded-full bg-blue-300'></div>
            <div className='relative h-4 w-4 animate-[jumpingDots_1.2s_0.8s_infinite] rounded-full bg-slate-100'></div>
        </div>
    )
}

export default MiniLoading
