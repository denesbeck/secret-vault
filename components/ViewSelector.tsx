import { VIEWS, VIEW_TYPE } from 'constants/dataTable'
import { useClickOutside } from 'hooks'
import { useState } from 'react'
import { BsViewList } from 'react-icons/bs'

interface ViewSelectorProps {
    currentView: string | null
    updateView: (view: VIEW_TYPE) => void
}

const ViewSelector = ({ currentView, updateView }: ViewSelectorProps) => {
    const [menuVisible, setMenuVisible] = useState(false)
    const ref = useClickOutside<HTMLDivElement>(() => setMenuVisible(false))

    return (
        <div className='relative'>
            <button
                onClick={() => setMenuVisible(true)}
                className={`flex h-max w-[14rem] rounded bg-slate-800/20 py-2 px-2 text-slate-200 outline-none outline-offset-2 ring-2 ring-slate-200 hover:ring-blue-300 focus-visible:outline-blue-300 ${
                    menuVisible && 'outline-blue-300 ring-2'
                }`}
            >
                <BsViewList className={`mr-6 h-6 w-6 ${currentView && 'text-blue-300'}`} />
                <span className='font-bold text-blue-300'>{currentView && '_'}</span>
                <span className='font-bold'>{currentView || '_select view...'}</span>
            </button>
            {menuVisible && (
                <div ref={ref} className='absolute top-12 -right-1 z-30 grid animate-slideInFromBottom'>
                    {VIEWS.map((view) => (
                        <button
                            onClick={() => {
                                updateView(view as VIEW_TYPE)
                                setMenuVisible(false)
                            }}
                            key={view}
                            className='group my-1 w-max min-w-full rounded bg-slate-800 px-2 py-1 text-start font-bold text-slate-300 outline-none ring-1 ring-slate-300 transition-all duration-150 ease-in-out hover:translate-x-4 hover:scale-110 hover:bg-slate-800 hover:text-slate-200 hover:ring-2 focus-visible:outline-blue-300 dark:hover:bg-slate-900'
                        >
                            <span className='group-hover:text-blue-300'>{'> _'}</span>
                            {view}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewSelector
