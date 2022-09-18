import { createContext } from 'react'

type SecretContextProps = {
    revalidate: () => void
}

const SecretContext = createContext<SecretContextProps>({
    revalidate: () => undefined,
})

export default SecretContext
