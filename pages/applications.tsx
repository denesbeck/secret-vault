import { AddApplication, Application, Layout, Search, ZeroResults } from 'components'
import pgPool from 'libs/pgPool'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import useSWR, { SWRConfig, useSWRConfig } from 'swr'
import { fetcherForApplication } from 'utils/fetchers'
import { useSaveUserAndWs } from 'hooks'
import { loadUserAndNs } from 'utils/loadUserAndNs'
import { ApplicationSchema, UserSchema, NamespaceSchema } from 'interfaces/schemas'
import { useContext, useEffect, useState } from 'react'
import { AppContext, MainContext } from 'contexts'

interface ApplicationProps {
    isAuthorized: boolean
    user: UserSchema
    namespaces: NamespaceSchema[]
    fallback: {
        '/api/applications': ApplicationSchema[]
    }
}

export default function Applications({ isAuthorized, user, namespaces, fallback }: ApplicationProps) {
    useSaveUserAndWs(isAuthorized, user, namespaces)

    const { state, dispatch } = useContext(MainContext)
    const [filterString, setFilterString] = useState('')

    const { mutate } = useSWRConfig()
    const [myFallback, setMyFallback] = useState(fallback['/api/applications'])

    const { data, error } = useSWR(
        state.namespaces &&
            state.user && [
                '/api/applications',
                state.namespaces.filter((namespace: NamespaceSchema) => namespace.selected).map((ns: NamespaceSchema) => ns.uuid),
                state.showOwnedOnly ? state.user.email : null,
                filterString,
            ],
        fetcherForApplication,
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
        const filteredNamespaces = state
            .namespaces!.filter((namespace: NamespaceSchema) => namespace.selected)
            .map((ns: NamespaceSchema) => ns.uuid)
        const userEmail = state.showOwnedOnly ? state.user!.email : null

        await mutate(['/api/applications', filteredNamespaces, userEmail, filterString])
        dispatch({ type: 'LOADING', payload: false })
    }

    const render = () => {
        if (!data) return null
        return data.length ? (
            <div className='grid w-full max-w-[90vw] grid-cols-fluid justify-items-center gap-10'>
                <div className='col-span-full flex w-full flex-wrap justify-end gap-10'>
                    <Search
                        filter={handleFilter}
                        syncFilterString={setFilterString}
                        label={filterString.length ? filterString : undefined}
                    />
                    <AddApplication />
                </div>
                {data.map((application: ApplicationSchema) => (
                    <Application key={application.uuid} {...application} />
                ))}
            </div>
        ) : (
            <ZeroResults type='application' reset={!data.length && filterString.length ? () => setFilterString('') : undefined} />
        )
    }

    if (!isAuthorized) return <div>401 | Unauthorized!</div>
    if (error) return <div>Something went wrong...</div>
    return (
        <SWRConfig value={{ fallback }}>
            <Head>
                <title>Secret Vault | Applications</title>
            </Head>
            <Layout>
                <AppContext.Provider
                    value={{
                        revalidate: handleFilter,
                    }}
                >
                    {render()}
                </AppContext.Provider>
            </Layout>
        </SWRConfig>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { user, namespaces } = await loadUserAndNs()

    const fetchApplications = async () => {
        let response
        try {
            response = await pgPool.query(
                'SELECT A.uuid, A.name, A.owner_name, A.owner_email, W.uuid AS ns_uuid, W.name AS ws_name FROM secret_vault.applications A JOIN secret_vault.namespaces AS W ON A.ns_uuid = W.uuid WHERE A.ns_uuid=ANY($1::uuid[]) ORDER BY A.inserted;',
                [namespaces.map((namespace: NamespaceSchema) => namespace.uuid)]
            )
        } catch (error: unknown) {
            console.error(error)
        }

        const { rows } = response
        return rows
    }
    const applications = await fetchApplications()

    return {
        props: {
            isAuthorized: true,
            user: user,
            namespaces: namespaces,
            fallback: {
                '/api/applications': applications,
            },
        },
    }
}
