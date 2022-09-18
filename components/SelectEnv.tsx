import { useContext, useEffect, useState } from 'react'
import { BiSelectMultiple } from 'react-icons/bi'
import { Checkbox, CloseButton, DarkLayout, EnvBadge, Title } from 'components'
import useSWR from 'swr'
import { MainContext } from 'contexts'
import { EnvironmentSchema, NamespaceSchema } from 'interfaces/schemas'
import { fetcherForSelectEnv } from 'utils/fetchers'
import { useClickOutside } from 'hooks'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'

const SelectEnv = () => {
    const { state, dispatch } = useContext(MainContext)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [selectAll, setSelectAll] = useState(true)
    const [selection, setSelection] = useState<string[]>([])
    const ref = useClickOutside<HTMLDivElement>(() => setDialogVisible(false))

    const { data, error } = useSWR(
        state.namespaces && [
            '/api/environments',
            state.namespaces.filter((namespace: NamespaceSchema) => namespace.selected).map((ns: NamespaceSchema) => ns.uuid),
        ],
        fetcherForSelectEnv
    )

    useEffect(() => {
        if (state.environments) return setSelection(state.environments)
        if (!state.environments && data) setSelection(data.map((env: EnvironmentSchema) => env.uuid))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.environments, data])

    const handleSelect = (uuid: string, checked: boolean) => {
        if (checked) {
            if (selection.indexOf(uuid) === -1)
                return setSelection((prevState) => {
                    return [...prevState, uuid]
                })
        }
        return setSelection((prevState) => prevState.filter((el) => el !== uuid))
    }

    if (!data || !data?.length) return null
    if (error) return <div>Something went wrong...</div>
    return (
        <>
            <button
                className='text-slate-200 outline-none hover:text-slate-300 focus-visible:text-blue-300'
                onClick={() => setDialogVisible((prevState) => !prevState)}
            >
                <div className='flex w-full items-center'>
                    <BiSelectMultiple className='mr-2 h-5 w-5' />
                    <span>Select environments</span>
                </div>
            </button>
            {dialogVisible && (
                <DarkLayout>
                    <div
                        ref={ref}
                        className='relative grid w-[30rem] max-w-[90%] animate-slideInFromBottom items-start gap-4 rounded-lg border-blue-300 bg-white p-8 text-slate-800 ring-1 ring-blue-300 dark:bg-slate-900 dark:text-slate-200'
                    >
                        <Title title='Select Environments' />
                        <div className='mr-6 grid grid-cols-2 items-center'>
                            <Checkbox
                                label='All selected'
                                value={selectAll}
                                toggle={() => {
                                    setSelectAll((prevState) => {
                                        setSelection(!prevState ? data.map((env: EnvironmentSchema) => env.uuid) : [])
                                        return !prevState
                                    })
                                }}
                            />

                            <button
                                className='flex w-max items-center space-x-1 self-start justify-self-end rounded border border-slate-400 px-2 py-0.5 text-slate-400 outline-none hover:border-blue-300 hover:bg-slate-800 hover:text-blue-300 focus-visible:outline-blue-300 dark:border-slate-200 dark:text-slate-200'
                                onClick={() => {
                                    dispatch({ type: 'ENVIRONMENTS', payload: selection })
                                    setDialogVisible(false)
                                }}
                            >
                                <IoCheckmarkDoneOutline className='h-5 w-5' />
                                <span>Apply</span>
                            </button>
                        </div>

                        <div className='max-h-[60vh] overflow-y-auto'>
                            {data?.length &&
                                data.map((environment: EnvironmentSchema) => (
                                    <div
                                        key={environment.uuid}
                                        className='grid items-center gap-1 border-b border-slate-300 px-1 py-4 last:border-b-0'
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
                                            <Checkbox
                                                value={selection.includes(environment.uuid)}
                                                toggle={(value: boolean) => handleSelect(environment.uuid, value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <CloseButton close={() => setDialogVisible(false)} />
                    </div>
                </DarkLayout>
            )}
        </>
    )
}

export default SelectEnv
