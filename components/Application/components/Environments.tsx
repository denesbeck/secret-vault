import { EnvBadge, EnvDialog, MiniLoading } from 'components'
import { MainContext } from 'contexts'
import { EnvironmentSchema } from 'interfaces/schemas'
import { useContext } from 'react'
import { fetcherForEnvironment } from 'utils/fetchers'
import useSWR from 'swr'
import { ArchetypeKeys, EnvArchetype, ENV_ARCHETYPES } from 'constants/envArchetypes'

export type BorderColor = {
    'ef0462a1-5346-4a8a-803b-4a54a3791cf2': string
    '4f1e8dad-4353-4e90-8887-f297f167344b': string
    'f5d1c6d6-8c44-404b-bd58-69e13fcced00': string
}

export const BORDER_COLOR = {
    'ef0462a1-5346-4a8a-803b-4a54a3791cf2': 'border-teal-500',
    '4f1e8dad-4353-4e90-8887-f297f167344b': 'border-blue-500',
    'f5d1c6d6-8c44-404b-bd58-69e13fcced00': 'border-cyan-800',
}
interface EnvironmentsProps {
    appUuid: string
    ownerEmail: string
}

const Environments = ({ appUuid, ownerEmail }: EnvironmentsProps) => {
    const { state } = useContext(MainContext)

    const { data, error, isValidating } = useSWR(`/api/environments/${appUuid}`, fetcherForEnvironment)

    const loadEnvBadges = (uuid: string) => {
        if (isValidating) return <MiniLoading />

        const environments = data.filter((env: EnvironmentSchema) => env.archetype_uuid === uuid)

        return !environments.length ? (
            <div className='ml-2 animate-[textFocus_0.3s_ease-in-out] font-normal'>Server returned zero records.</div>
        ) : (
            environments.map((env: EnvironmentSchema) => <EnvBadge key={env.uuid} {...env} owner_email={ownerEmail} />)
        )
    }

    if (error) return <div>Something went wrong...</div>
    return (
        <div className='mt-10 max-h-[24rem] space-y-4 overflow-auto'>
            {(ENV_ARCHETYPES as EnvArchetype[]).map((envArchetype) => (
                <div
                    className={`border-l-4 ${
                        BORDER_COLOR[envArchetype.uuid as keyof BorderColor]
                    } py-1 pl-2 font-bold text-slate-600 dark:text-slate-100`}
                    key={envArchetype.uuid}
                >
                    <div className='mb-4 flex items-center space-x-2 uppercase'>
                        <span>{envArchetype.name}:</span>
                        {state.user?.email === ownerEmail && (
                            <EnvDialog appUuid={appUuid} archetypeUuid={envArchetype.uuid as ArchetypeKeys} />
                        )}
                    </div>
                    <div className='flex flex-wrap gap-2'>{loadEnvBadges(envArchetype.uuid)}</div>
                </div>
            ))}
        </div>
    )
}

export default Environments
