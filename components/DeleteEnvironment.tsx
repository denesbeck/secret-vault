import { useContext, useState } from 'react'
import { useSWRConfig } from 'swr'
import { DeleteButton, Dialog } from 'components'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import { MainContext } from 'contexts'

interface DeleteEnvironmentProps {
    uuid: string
    appUuid: string
}

const DeleteEnvironment = ({ uuid, appUuid }: DeleteEnvironmentProps) => {
    const { dispatch } = useContext(MainContext)
    const [dialogVisible, setDialogVisible] = useState(false)
    const { mutate } = useSWRConfig()

    const handleDeletionRequest = async () => {
        dispatch({ type: 'LOADING', payload: true })

        try {
            await axios.delete(`/api/environments/${uuid}`)
        } catch {
            dispatch({ type: 'LOADING', payload: false })
            return NotificationManager.error(`Something went wrong! Unable to delete environment.`)
        }

        mutate(`/api/environments/${appUuid}`)

        NotificationManager.success(`Environment has been deleted successfully!`)
        setDialogVisible(false)
        dispatch({ type: 'LOADING', payload: false })
    }

    return (
        <>
            <DeleteButton handler={() => setDialogVisible(true)} />
            {dialogVisible && (
                <Dialog
                    message={`Are you sure you want to delete this environment?`}
                    handler={handleDeletionRequest}
                    close={() => setDialogVisible(false)}
                />
            )}
        </>
    )
}

export default DeleteEnvironment
