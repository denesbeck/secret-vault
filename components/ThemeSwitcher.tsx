import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, systemTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (theme === 'system' && systemTheme) setTheme(systemTheme)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!mounted) {
        return null
    }

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
    
    return (
        <div className='flex h-auto items-center'>
            <button
                className='h-8 w-8 rounded-full p-2 text-gray-200 outline-none outline-offset-2 ring-1 ring-slate-700 transition-all duration-200 ease-in-out hover:bg-slate-700 focus-visible:outline-blue-300'
                onClick={toggleTheme}
            >
                {theme === 'dark' ? (
                    <BsMoon className='h-full w-full animate-fadeIn' />
                ) : (
                    <BsSun className='h-full w-full animate-fadeIn' />
                )}
            </button>
        </div>
    )
}

export default ThemeSwitcher
