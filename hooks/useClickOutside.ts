import { useEffect, useRef } from 'react'

function useClickOutside<T extends HTMLElement = HTMLElement>(handler: (event: MouseEvent) => void) {
    const ref = useRef<T>(null)
    useEffect(() => {
        const outside = (e: MouseEvent) => {
            const el = ref?.current
            if (el && !el.contains(e.target as Node)) {
                handler(e)
            }
        }

        document.addEventListener('mousedown', outside)

        return () => {
            document.removeEventListener('mousedown', outside)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ref
}

export default useClickOutside
