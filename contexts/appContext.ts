import { createContext } from 'react'

type AppContextProps = {
    revalidate: () => void
}

const AppContext = createContext<AppContextProps>({
    revalidate: () => undefined,
})

export default AppContext
