import { AddButton, Button, Dropdown, InputDialog, InputField, Namespace } from 'components'
import { NamespaceSchema } from 'interfaces/schemas'
import { AppContext, MainContext } from 'contexts'
import { NotificationManager } from 'react-notifications'
import { useContext, useState, useEffect } from 'react'
import { validateInputs } from 'utils/appInputValidator'
import { AppInputValues } from './InputDialog/types'
import axios from 'axios'

interface AddApplicationProps {
    first?: boolean
}

const INIT_INPUT_DATA = {
    namespace: null,
    name: '',
    ownerName: '',
    ownerEmail: '',
}

const AddApplication = ({ first = false }: AddApplicationProps) => {
    const { state, dispatch } = useContext(MainContext)
    const { revalidate } = useContext(AppContext)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [inputValues, setInputValues] = useState<AppInputValues>(INIT_INPUT_DATA)

    useEffect(() => {
        if (!dialogVisible) setInputValues(INIT_INPUT_DATA)
    }, [dialogVisible])

    const handleInsert = async () => {
        dispatch({ type: 'LOADING', payload: true })

        const validationResult = validateInputs(inputValues.namespace?.uuid, inputValues.name, state.user?.name, state.user?.email)
        if (!validationResult) return dispatch({ type: 'LOADING', payload: false })

        try {
            await axios.post('/api/applications', {
                namespace: inputValues.namespace?.uuid,
                name: inputValues.name,
                ownerName: state.user?.name,
                ownerEmail: state.user?.email,
            })
        } catch {
            dispatch({ type: 'LOADING', payload: false })
            return NotificationManager.error('Something went wrong! Unable to register application.')
        }

        revalidate()
        setDialogVisible(false)
        dispatch({ type: 'LOADING', payload: false })
    }

    return (
        <>
            {first ? (
                <Button label='Register application' type='primary' handler={() => setDialogVisible(true)} />
            ) : (
                <AddButton handler={() => setDialogVisible(true)} label='Add new application' />
            )}

            {dialogVisible && state.namespaces && (
                <InputDialog
                    title='Register application'
                    primaryButtonLabel='Submit'
                    close={() => setDialogVisible(false)}
                    handler={handleInsert}
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
                        label={inputValues.namespace?.name || 'Select namespace...'}
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

export default AddApplication
