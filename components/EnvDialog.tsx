import { AiOutlinePlus } from 'react-icons/ai'
import { InputDialog, InputField, UpdateButton } from 'components'
import { useContext, useEffect, useState } from 'react'
import { BorderColor, BORDER_COLOR } from './Application/components/Environments'
import { MainContext } from 'contexts'
import { NotificationManager } from 'react-notifications'
import axios from 'axios'
import { useSWRConfig } from 'swr'
import { ENV_ARCHETYPES } from 'constants/envArchetypes'

interface EnvDialogProps {
    appUuid: string
    archetypeUuid: 'ef0462a1-5346-4a8a-803b-4a54a3791cf2' | '4f1e8dad-4353-4e90-8887-f297f167344b' | 'f5d1c6d6-8c44-404b-bd58-69e13fcced00'
    initValue?: string
    envUuid?: string
}
export type EnvInputValues = {
    name: string
    archetype: string
    appUuid: string
}

const EnvDialog = ({ appUuid, archetypeUuid, initValue, envUuid }: EnvDialogProps) => {
    const { mutate } = useSWRConfig()
    const { dispatch } = useContext(MainContext)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [environmentName, setEnvironmentName] = useState(initValue || '')
    const color = {
        'ef0462a1-5346-4a8a-803b-4a54a3791cf2': 'ring-teal-500 text-teal-500 hover:bg-teal-500/30',
        '4f1e8dad-4353-4e90-8887-f297f167344b': 'ring-blue-500 text-blue-500 hover:bg-blue-500/30',
        'f5d1c6d6-8c44-404b-bd58-69e13fcced00': 'ring-cyan-800 text-cyan-800 hover:bg-cyan-800/30',
    }

    useEffect(() => {
        if (!dialogVisible) setEnvironmentName('')
        if (dialogVisible && initValue) setEnvironmentName(initValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogVisible])

    const handleInsertEnvironment = async () => {
        dispatch({ type: 'LOADING', payload: true })

        if (!environmentName) return NotificationManager.warning('Please enter environment name.')

        try {
            if (initValue) {
                if (!envUuid) {
                    dispatch({ type: 'LOADING', payload: false })
                    return NotificationManager.error('Environment id not found.')
                }
                await axios.put(`/api/environments/${envUuid}`, {
                    envName: environmentName,
                })
            } else {
                await axios.post('/api/environments', {
                    appUuid: appUuid,
                    archetype: archetypeUuid,
                    envName: environmentName,
                })
            }
        } catch {
            setDialogVisible(false)
            dispatch({ type: 'LOADING', payload: false })
            return NotificationManager.error(`Something went wrong! Unable to ${initValue ? 'update' : 'register'} application.`)
        }

        mutate(`/api/environments/${appUuid}`)
        setDialogVisible(false)
        dispatch({ type: 'LOADING', payload: false })
    }
    return (
        <>
            {initValue ? (
                <UpdateButton handler={() => setDialogVisible(true)} />
            ) : (
                <button
                    className={`h-6 w-6 rounded-full outline-none ring-1 focus-visible:text-blue-300 ${color[archetypeUuid]}`}
                    onClick={() => setDialogVisible(true)}
                >
                    <AiOutlinePlus className='h-full w-full' />
                </button>
            )}
            {dialogVisible && (
                <InputDialog
                    title={`${initValue ? 'Update' : 'Register'} environment`}
                    primaryButtonLabel={initValue ? 'Update' : 'Submit'}
                    close={() => setDialogVisible(false)}
                    handler={handleInsertEnvironment}
                >
                    <div className='flex items-center space-x-4'>
                        <span className={`border-l-4 ${BORDER_COLOR[archetypeUuid as keyof BorderColor]} py-1 pl-2`}>Archetype:</span>
                        <span className='font-bold'>
                            {ENV_ARCHETYPES.filter((archetype) => archetype.uuid === archetypeUuid)[0].name.toUpperCase()}
                        </span>
                    </div>
                    <InputField
                        autoFocus
                        maxLength={16}
                        label='Environment name'
                        value={environmentName}
                        handler={(value: string) => setEnvironmentName(value)}
                    />
                </InputDialog>
            )}
        </>
    )
}

export default EnvDialog
