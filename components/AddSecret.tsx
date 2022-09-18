import { AddButton, Button, DatePicker, InputDialog, InputField } from 'components'
import { useState, useContext, useEffect } from 'react'
import { SecretContext, MainContext } from 'contexts'
import { NotificationManager } from 'react-notifications'
import { SecretInputValues } from './InputDialog/types'
import { validateInputs } from './InputDialog/utils'
import axios from 'axios'

interface AddSecretProps {
    first?: boolean
}

const AddSecret = ({ first = false }: AddSecretProps) => {
    const { state, dispatch } = useContext(MainContext)
    const { revalidate } = useContext(SecretContext)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [inputValues, setInputValues] = useState<SecretInputValues>({
        name: '',
        username: '',
        password: '',
        expirationDate: '',
    })

    useEffect(() => {
        if (dialogVisible) setInputValues({ name: '', username: '', password: '', expirationDate: '' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogVisible])

    const handleInsert = async () => {
        dispatch({ type: 'LOADING', payload: true })

        const validationResult = validateInputs(inputValues)
        if (!validationResult) return dispatch({ type: 'LOADING', payload: false })

        try {
            await axios.post('/api/secrets', {
                name: inputValues.name,
                ownerName: state.user!.name,
                ownerEmail: state.user!.email,
                username: inputValues.username,
                password: inputValues.password,
                expirationDate: inputValues.expirationDate,
            })
        } catch {
            dispatch({ type: 'LOADING', payload: false })
            return NotificationManager.error('Something went wrong! Unable to register record.')
        }

        revalidate()
        setDialogVisible(false)
        dispatch({ type: 'LOADING', payload: false })
    }

    return (
        <>
            {first ? (
                <Button label='Register secrets' type='primary' handler={() => setDialogVisible(true)} />
            ) : (
                <AddButton handler={() => setDialogVisible(true)} label='Add new secrets' />
            )}
            {dialogVisible && (
                <InputDialog
                    title='Register secrets'
                    primaryButtonLabel='Submit'
                    close={() => setDialogVisible(false)}
                    handler={handleInsert}
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

export default AddSecret
