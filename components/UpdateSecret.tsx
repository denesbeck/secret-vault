import { DatePicker, InputDialog, InputField, UpdateButton } from 'components'
import { useState, useContext, useEffect } from 'react'
import { SecretContext, MainContext } from 'contexts'
import { NotificationManager } from 'react-notifications'
import { SecretInputValues } from './InputDialog/types'
import { validateInputs } from './InputDialog/utils'
import axios from 'axios'

interface UpdateSecretsProps {
    uuid: string
    name: string
    username: string
    password: string
    expirationDate: string
}

const UpdateSecrets = ({ uuid, name, username, password, expirationDate }: UpdateSecretsProps) => {
    const { dispatch } = useContext(MainContext)
    const { revalidate } = useContext(SecretContext)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [inputValues, setInputValues] = useState<SecretInputValues>({
        name: name,
        username: username,
        password: password,
        expirationDate: expirationDate,
    })

    useEffect(() => {
        if (dialogVisible) setInputValues({ name: name, username: username, password: password, expirationDate: expirationDate })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogVisible])

    const handleUpdate = async () => {
        dispatch({ type: 'LOADING', payload: true })

        const validationResult = validateInputs(inputValues)
        if (!validationResult) return dispatch({ type: 'LOADING', payload: false })

        try {
            await axios.put(`/api/secrets/${uuid}`, {
                name: inputValues.name,
                username: inputValues.username,
                password: inputValues.password,
                expirationDate: inputValues.expirationDate,
            })
        } catch {
            dispatch({ type: 'LOADING', payload: false })
            return NotificationManager.error('Something went wrong! Unable to update record.')
        }

        revalidate()
        setDialogVisible(false)
        dispatch({ type: 'LOADING', payload: false })
    }

    return (
        <>
            <UpdateButton handler={() => setDialogVisible(true)} colored />
            {dialogVisible && (
                <InputDialog
                    title='Update secrets'
                    primaryButtonLabel='Update'
                    close={() => setDialogVisible(false)}
                    handler={handleUpdate}
                >
                    <InputField
                        maxLength={32}
                        label='Name'
                        autoFocus
                        value={inputValues.name}
                        handler={(value: string) =>
                            setInputValues((prevState) => {
                                return { ...prevState, name: value }
                            })
                        }
                    />
                    <InputField
                        maxLength={32}
                        label='Username'
                        uppercase
                        value={inputValues.username}
                        handler={(value: string) =>
                            setInputValues((prevState) => {
                                return { ...prevState, username: value }
                            })
                        }
                    />
                    <InputField
                        maxLength={32}
                        label='Password'
                        isPassword
                        value={inputValues.password}
                        handler={(value: string) =>
                            setInputValues((prevState) => {
                                return { ...prevState, password: value }
                            })
                        }
                    />
                    <DatePicker
                        label='Expiration date'
                        initialDate={expirationDate}
                        storeDateString={(value: string) =>
                            setInputValues((prevState) => {
                                return { ...prevState, expirationDate: value }
                            })
                        }
                    />
                </InputDialog>
            )}
        </>
    )
}

export default UpdateSecrets
