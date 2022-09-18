import axios from 'axios'
import { Dropdown, InputDialog, InputField, UpdateButton, Namespace } from 'components'
import { AppContext, MainContext } from 'contexts'
import { NamespaceSchema } from 'interfaces/schemas'
import { useContext, useEffect, useState } from 'react'
import { validateInputs } from 'utils/appInputValidator'
import { NotificationManager } from 'react-notifications'
import { AppInputValues } from './InputDialog/types'

interface UpdateApplicationProps {
    initData: AppInputValues
}

const UpdateApplication = ({ initData }: UpdateApplicationProps) => {
    const { state, dispatch } = useContext(MainContext)
    const { revalidate } = useContext(AppContext)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [inputValues, setInputValues] = useState<AppInputValues>(initData)

    useEffect(() => {
        if (dialogVisible) setInputValues(initData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogVisible])

    const handleUpdate = async () => {
        dispatch({ type: 'LOADING', payload: true })

        const validationResult = validateInputs(
            inputValues.namespace!.uuid,
            inputValues.name,
            inputValues.ownerName,
            inputValues.ownerEmail
        )
        if (!validationResult) return dispatch({ type: 'LOADING', payload: false })

        try {
            await axios.put(`/api/applications/${inputValues.uuid}`, {
                namespace: inputValues.namespace!.uuid,
                name: inputValues.name,
            })
        } catch {
            setDialogVisible(false)
            dispatch({ type: 'LOADING', payload: false })
            return NotificationManager.error('Something went wrong! Unable to update application.')
        }

        revalidate()
        setDialogVisible(false)
        dispatch({ type: 'LOADING', payload: false })
    }

    return (
        <>
            <UpdateButton handler={() => setDialogVisible(true)} colored />
            {dialogVisible && state.namespaces && (
                <InputDialog
                    title='Update application'
                    primaryButtonLabel='Update'
                    close={() => setDialogVisible(false)}
                    handler={handleUpdate}
                >
                    <InputField
                        autoFocus
                        maxLength={32}
                        label='Application name'
                        value={inputValues.name}
                        handler={(value: string) =>
                            setInputValues((prevState: AppInputValues) => {
                                return { ...prevState, name: value }
                            })
                        }
                    />
                    <Dropdown
                        label={inputValues.namespace!.name || 'Select namespace...'}
                        disabled={state.namespaces.length === 1}
                        formMode
                        menuPosition='tl'
                    >
                        {state.namespaces.map((ns: NamespaceSchema) => (
                            <Namespace
                                key={ns.uuid}
                                label={ns.name}
                                handler={() =>
                                    setInputValues((prevState: AppInputValues) => {
                                        return { ...prevState, namespace: ns }
                                    })
                                }
                            />
                        ))}
                    </Dropdown>
                </InputDialog>
            )}
        </>
    )
}

export default UpdateApplication
