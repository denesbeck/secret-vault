import { useContext, useState } from 'react'
import { DeleteButton, Dialog } from 'components'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import { SecretContext, MainContext } from 'contexts'

interface DeleteSecretsProps {
    uuid: string
}

const DeleteSecrets = ({ uuid }: DeleteSecretsProps) => {
    const { dispatch } = useContext(MainContext)
    const { revalidate } = useContext(SecretContext)
    const [dialogVisible, setDialogVisible] = useState(false)

    const handleDeletionRequest = async () => {
        dispatch({ type: 'LOADING', payload: true })

        try {
            await axios.delete(`/api/secrets/${uuid}`)
        } catch {
            dispatch({ type: 'LOADING', payload: false })
            return NotificationManager.error(`Something went wrong! Unable to delete secrets.`)
        }

        revalidate()

        NotificationManager.success(`Secrets have been deleted successfully!`)
        setDialogVisible(false)
        dispatch({ type: 'LOADING', payload: false })
    }

    return (
        <>
            <DeleteButton handler={() => setDialogVisible(true)} colored />
            {dialogVisible && (
                <Dialog
                    message={`Are you sure you want to delete these secrets?`}
                    handler={handleDeletionRequest}
                    close={() => setDialogVisible(false)}
                />
            )}
        </>
    )
}

export default DeleteSecrets
