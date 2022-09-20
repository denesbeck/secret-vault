import { FaKey } from 'react-icons/fa'
import { CopyButton, DeleteEnvironment, EnvDialog } from 'components'
import { useContext } from 'react'
import { MainContext } from 'contexts'
import { ArchetypeKeys } from 'constants/envArchetypes'

type Style = {
    'ef0462a1-5346-4a8a-803b-4a54a3791cf2': string
    '4f1e8dad-4353-4e90-8887-f297f167344b': string
    'f5d1c6d6-8c44-404b-bd58-69e13fcced00': string
}

interface EnvBadgeProps {
    readonly?: boolean
    uuid?: string
    api_key?: string
    archetype_uuid: string
    name: string
    app_uuid?: string
    owner_email?: string
}

const EnvBadge = ({ readonly = false, uuid, api_key, archetype_uuid, name, app_uuid, owner_email }: EnvBadgeProps) => {
    const { state } = useContext(MainContext)
    const styles: Style = {
        'ef0462a1-5346-4a8a-803b-4a54a3791cf2': 'bg-teal-500/90 group-hover:bg-teal-400 hover:bg-teal-400',
        '4f1e8dad-4353-4e90-8887-f297f167344b': 'bg-blue-500/90 group-hover:bg-blue-400 hover:bg-blue-400',
        'f5d1c6d6-8c44-404b-bd58-69e13fcced00': 'bg-cyan-800/90 group-hover:bg-cyan-600 hover:bg-cyan-600',
    }

    return (
        <div
            className={`${
                styles[archetype_uuid as keyof Style]
            } flex h-6 w-max animate-[textFocus_0.3s_ease-in-out] select-none items-center space-x-2 rounded-full px-3 text-start text-white shadow-md ring-1 ring-white`}
        >
            <span className={`mr-1 w-max font-mono text-sm font-normal`}>{name}</span>{' '}
            {!readonly && (
                <>
                    <span>|</span>
                    <CopyButton value={api_key as string} icon={FaKey} infoText='API key copied to clipboard.' />
                    {owner_email === state.user!.email && (
                        <>
                            <EnvDialog
                                initValue={name}
                                archetypeUuid={archetype_uuid as ArchetypeKeys}
                                envUuid={uuid}
                                appUuid={app_uuid as string}
                            />
                            <DeleteEnvironment uuid={uuid as string} appUuid={app_uuid as string} />
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default EnvBadge
