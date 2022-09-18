import { SecretContext, MainContext } from 'contexts'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { AddSecret, DataTable, Layout, Search, SelectEnv, TransitionedTable, ZeroResults } from 'components'
import { fetcherForSecrets } from 'utils/fetchers'
import { NamespaceSchema } from 'interfaces/schemas'
import { HEADERS } from 'constants/dataTable'

const Secrets = () => {
    const { state, dispatch } = useContext(MainContext)
    const [filterString, setFilterString] = useState('')

    const { mutate, fallback } = useSWRConfig()
    const [myFallback, setMyFallback] = useState(fallback['/api/secrets'])

    const { data, error } = useSWR(
        state.namespaces &&
            state.user && [
                '/api/secrets',
                state.namespaces.filter((namespace: NamespaceSchema) => namespace.selected).map((ns: NamespaceSchema) => ns.uuid),
                state.user.email,
                state.namespaces.every((namespace: NamespaceSchema) => namespace.selected),
                state.showOwnedOnly,
                filterString,
                state.environments,
            ],
        fetcherForSecrets,
        { refreshInterval: 1000, fallbackData: myFallback }
    )

    useEffect(() => {
        if (data) setMyFallback(data)
    }, [data])

    useEffect(() => {
        if (state.namespaces) handleFilter()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.namespaces, state.showOwnedOnly])

    const handleFilter = async () => {
        dispatch({ type: 'LOADING', payload: true })
        const namespaces = state
            .namespaces!.filter((namespace: NamespaceSchema) => namespace.selected)
            .map((ns: NamespaceSchema) => ns.uuid)
        const userEmail = state.user!.email
        const showAll = state.namespaces!.every((namespace: NamespaceSchema) => namespace.selected)
        const showOwnedOnly = state.showOwnedOnly
        const environments = state.environments

        await mutate(['/api/secrets', namespaces, userEmail, showAll, showOwnedOnly, filterString, environments])
        dispatch({ type: 'LOADING', payload: false })
    }

    const render = () => {
        if (!data) return null
        return data.length ? (
            <div className='flex w-max max-w-[90%] flex-col items-center'>
                <div className='mb-2 flex w-full flex-wrap justify-end gap-10 px-1'>
                    <Search
                        filter={handleFilter}
                        syncFilterString={setFilterString}
                        label={filterString.length ? filterString : undefined}
                    />
                    <SelectEnv />
                    <AddSecret />
                </div>
                <DataTable headers={HEADERS} data={data} />
                <div className='mt-4 block w-[95vw] xl:hidden'>
                    <TransitionedTable data={data} />
                </div>
            </div>
        ) : (
            <ZeroResults
                type='secrets'
                reset={
                    !data.length &&
                    (filterString.length ||
                        (state.environments && !state.environments.length) ||
                        (state.environments && state.environments.length))
                        ? () => {
                              setFilterString('')
                              dispatch({ type: 'ENVIRONMENTS', payload: null })
                          }
                        : undefined
                }
            />
        )
    }

    if (error) return <div>Something went wrong...</div>
    return (
        <>
            <Head>
                <title>Secret Vault | Secrets</title>
            </Head>
            <Layout>
                <SecretContext.Provider
                    value={{
                        revalidate: handleFilter,
                    }}
                >
                    {render()}
                </SecretContext.Provider>
            </Layout>
        </>
    )
}

export default Secrets
