import axios from 'axios'
import { useSWRConfig } from 'swr'
import { AppContext, MainContext } from 'contexts'
import { useContext } from 'react'
import { BiLink, BiUnlink } from 'react-icons/bi'
import { NotificationManager } from 'react-notifications'
import { NamespaceSchema } from 'interfaces/schemas'

interface LinkButtonProps {
    linked: string | null
    refetch: () => void
    wsUuid: string
    envUuid: string
    secretUuid: string
}

const LinkButton = ({ linked, refetch, wsUuid, envUuid, secretUuid }: LinkButtonProps) => {
    const { state } = useContext(MainContext)
    const { revalidate } = useContext(AppContext)
    const { mutate } = useSWRConfig()

    const handleDeleteReference = async () => {
        try {
            await axios.delete(`/api/references/${linked}`)
        } catch {
            return NotificationManager.error(`Something went wrong! Unable to delete environment link.`)
        }

        revalidate()
        refetch()

        NotificationManager.success(`Environment link has been deleted successfully!`)
    }

    const handleCreateReference = async () => {
        try {
            await axios.post(`/api/references`, { wsUuid: wsUuid, envUuid: envUuid, secretUuid: secretUuid })
        } catch {
            return NotificationManager.error(`Something went wrong! Unable to set environment link.`)
        }
        const namespaces = state
            .namespaces!.filter((namespace: NamespaceSchema) => namespace.selected)
            .map((ns: NamespaceSchema) => ns.uuid)
        const userEmail = state.user!.email
        const showAll = state.namespaces!.every((namespace: NamespaceSchema) => namespace.selected)
        const showOwnedOnly = state.showOwnedOnly

        mutate(['/api/secrets', namespaces, userEmail, showAll, showOwnedOnly])
        refetch()

        NotificationManager.success(`Environment link has been set successfully!`)
    }

    return (
        <>
            {linked ? (
                <button
                    onClick={handleDeleteReference}
                    className='h-7 w-7 rounded-full p-0.5 text-pink-800 outline-none ring-1 ring-pink-800 transition-all duration-200 ease-in-out hover:bg-pink-900/10 hover:text-pink-900 hover:ring-pink-900 focus-visible:outline-pink-800 dark:hover:bg-pink-700/10 dark:hover:text-pink-700 dark:hover:ring-pink-700 dark:focus-visible:outline-pink-700'
                >
                    <BiUnlink className='h-full w-full' />
                </button>
            ) : (
                <button
                    onClick={handleCreateReference}
                    className='h-7 w-7 rounded-full p-0.5 text-blue-300 outline-none ring-1 ring-blue-300 transition-all duration-200 ease-in-out hover:bg-blue-400/10 hover:text-blue-400 hover:ring-blue-400 focus-visible:outline-blue-300 dark:hover:bg-blue-200/10 dark:hover:text-blue-200 dark:hover:ring-blue-200 dark:focus-visible:outline-blue-200'
                >
                    <BiLink className='h-full w-full' />
                </button>
            )}
        </>
    )
}

export default LinkButton
