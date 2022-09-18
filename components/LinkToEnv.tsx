import { CloseButton, DarkLayout, EnvBadge, EnvFilter, LinkButton, NoRecords, Title } from 'components'
import { MainContext } from 'contexts'
import { useClickOutside, useFilter } from 'hooks'
import { EnvironmentSchema, NamespaceSchema } from 'interfaces/schemas'
import { MouseEvent, useContext, useState } from 'react'
import { BsLink } from 'react-icons/bs'
import useSWR from 'swr'
import { fetcherForLinkToEnv } from 'utils/fetchers'

const COLS = ['name', 'app_name', 'ws_name']

interface LinkToEnvProps {
    uuid: string
    name: string
}

export type ArchetypeState = {
    'ef0462a1-5346-4a8a-803b-4a54a3791cf2': boolean
    '4f1e8dad-4353-4e90-8887-f297f167344b': boolean
    'f5d1c6d6-8c44-404b-bd58-69e13fcced00': boolean
}

const LinkToEnv = ({ uuid, name }: LinkToEnvProps) => {
    const { state } = useContext(MainContext)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [showLinkedOnly, setShowLinkedOnly] = useState(false)
    const [archetypes, setArchetypes] = useState<ArchetypeState>({
        'ef0462a1-5346-4a8a-803b-4a54a3791cf2': true,
        '4f1e8dad-4353-4e90-8887-f297f167344b': true,
        'f5d1c6d6-8c44-404b-bd58-69e13fcced00': true,
    })
    const ref = useClickOutside<HTMLDivElement>(() => setDialogVisible(false))

    const { data, error, mutate } = useSWR(
        state.namespaces && [
            '/api/environments',
            state.namespaces.filter((namespace: NamespaceSchema) => namespace.selected).map((ns: NamespaceSchema) => ns.uuid),
            uuid,
        ],
        fetcherForLinkToEnv
    )

    const { result, filter } = useFilter(data, COLS)

    if (!data || error) return <div className='w-6'></div>
    return (
        <>
            {data.length ? (
                <button
                    onClick={(e: MouseEvent) => {
                        e.stopPropagation()
                        setDialogVisible(true)
                    }}
                    className='h-6 w-6 rounded-full outline-none outline-offset-0 transition-transform duration-200 ease-in-out hover:scale-110 focus-visible:outline-blue-300'
                >
                    <BsLink className='h-full w-full' />
                </button>
            ) : null}
            {dialogVisible && (
                <DarkLayout>
                    <div
                        ref={ref}
                        className='relative grid max-h-[99vh] w-[30rem] max-w-[90%] animate-slideInFromBottom items-start gap-4 rounded-lg border-blue-300 bg-white p-8 text-slate-800 ring-1 ring-blue-300 dark:bg-slate-900 dark:text-slate-200'
                    >
                        <Title title='Link to Environment' />
                        <div className='text-lg text-slate-400'>Secret: {name}</div>
                        <EnvFilter
                            showLinkedOnlyValue={showLinkedOnly}
                            toggleShowLinkedOnly={() => setShowLinkedOnly((prevState) => !prevState)}
                            filter={filter}
                            toggleArchetypes={setArchetypes}
                            archetypeState={archetypes}
                        />
                        <div className='max-h-[55vh] overflow-y-auto'>
                            {(showLinkedOnly ? result.filter((el: EnvironmentSchema) => el.ref_uuid) : result)
                                .filter((element: EnvironmentSchema) => {
                                    const tempArr = []
                                    for (const [key, value] of Object.entries(archetypes)) {
                                        if (value) tempArr.push(key)
                                    }
                                    return tempArr.includes(element.archetype_uuid)
                                })
                                .map((environment: EnvironmentSchema) => (
                                    <div
                                        key={environment.uuid}
                                        className='relative grid items-center gap-1 border-b border-slate-300 px-1 py-4 last:border-b-0'
                                    >
                                        <div className='flex space-x-2'>
                                            <span className='w-[5ch] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-200'>
                                                NS:
                                            </span>
                                            <span className='uppercase tracking-wider text-slate-600 dark:text-slate-200'>
                                                {environment.ws_name}
                                            </span>
                                        </div>
                                        <div className='flex space-x-2'>
                                            <span className='w-[5ch] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-200'>
                                                APP:
                                            </span>
                                            <span className='uppercase tracking-wider text-slate-600 dark:text-slate-200'>
                                                {environment.app_name}
                                            </span>
                                        </div>
                                        <div className='mr-4 flex items-center justify-between space-x-4'>
                                            <div className='flex space-x-2'>
                                                <span className='w-[5ch] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-200'>
                                                    ENV:
                                                </span>
                                                <EnvBadge {...environment} readonly />
                                            </div>
                                            <LinkButton
                                                linked={environment.ref_uuid as string}
                                                wsUuid={environment.ns_uuid}
                                                envUuid={environment.uuid}
                                                secretUuid={uuid}
                                                refetch={mutate}
                                            />
                                        </div>
                                    </div>
                                ))}
                            {((showLinkedOnly && data.every((el: EnvironmentSchema) => !el.ref_uuid)) || !result.length) && <NoRecords />}
                        </div>
                        <CloseButton close={() => setDialogVisible(false)} />
                    </div>
                </DarkLayout>
            )}
        </>
    )
}

export default LinkToEnv
