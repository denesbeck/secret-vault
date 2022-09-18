import { useContext, useState } from 'react'
import { DeleteButton, Dialog } from 'components'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import { AppContext, MainContext } from 'contexts'

interface DeleteApplicationProps {
    uuid: string
}

const DeleteApplication = ({ uuid }: DeleteApplicationProps) => {
    const { dispatch } = useContext(MainContext)
    const { revalidate } = useContext(AppContext)
    const [dialogVisible, setDialogVisible] = useState(false)

    const handleDeletionRequest = async () => {
        dispatch({ type: 'LOADING', payload: true })

        try {
            await axios.delete(`/api/applications/${uuid}`)
        } catch {
            dispatch({ type: 'LOADING', payload: false })
            return NotificationManager.error(`Something went wrong! Unable to delete application.`)
        }

        revalidate()

        NotificationManager.success(`Application has been deleted successfully!`)
        setDialogVisible(false)
        dispatch({ type: 'LOADING', payload: false })
    }

    return (
        <>
            <DeleteButton handler={() => setDialogVisible(true)} colored />
            {dialogVisible && (
                <Dialog
                    message={`Are you sure you want to delete this application?`}
                    handler={handleDeletionRequest}
                    close={() => setDialogVisible(false)}
                />
            )}
        </>
    )
}

export default DeleteApplication
