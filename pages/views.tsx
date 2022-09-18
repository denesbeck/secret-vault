import { Layout, ViewTable, ViewSelector } from 'components'
import { VIEW_METADATA_TYPE, VIEW_OBJECTS, VIEW_OBJECTS_TYPE, VIEW_TYPE } from 'constants/dataTable'
import { MainContext } from 'contexts'
import { useSaveUserAndWs } from 'hooks'
import { UserSchema, NamespaceSchema } from 'interfaces/schemas'
import Head from 'next/head'
import { GetServerSideProps } from 'next/types'
import { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { loadUserAndNs } from 'utils/loadUserAndNs'
import { fetcherForViews } from 'utils/fetchers'

interface ViewsProps {
    isAuthorized: boolean
    user: UserSchema
    namespaces: NamespaceSchema[]
}

export default function Views({ isAuthorized, user, namespaces }: ViewsProps) {
    useSaveUserAndWs(isAuthorized, user, namespaces)
    const { dispatch } = useContext(MainContext)
    const [currentView, setCurrentView] = useState<VIEW_TYPE | null>(null)

    const { data, error, isValidating } = useSWR(
        currentView && [(VIEW_OBJECTS[currentView as keyof VIEW_OBJECTS_TYPE] as VIEW_METADATA_TYPE).endpoint, user.email],
        fetcherForViews,
        { refreshInterval: 1000 }
    )

    useEffect(() => {
        dispatch({ type: 'LOADING', payload: !data && isValidating })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isValidating])

    if (!isAuthorized) return <div>401 | Unauthorized!</div>
    if (error) return <div>Something went wrong...</div>
    return (
        <>
            <Head>
                <title>Secret Vault | Views</title>
            </Head>
            <Layout>
                <div className={`flex h-full w-full flex-col items-center gap-10`}>
                    <ViewSelector currentView={currentView} updateView={setCurrentView} />
                    {data && currentView && <ViewTable data={data} currentView={currentView} />}
                </div>
            </Layout>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { user, namespaces } = await loadUserAndNs()

    return {
        props: {
            isAuthorized: true,
            user: user,
            namespaces: namespaces,
        },
    }
}
