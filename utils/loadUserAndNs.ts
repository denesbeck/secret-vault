import pgPool from 'libs/pgPool'

export const loadUserAndNs = async () => {
    // Mock user data. To be replaced by SSO user data.
    const fetchUser = async () => {
        return {
            name: 'John Doe',
            email: 'john.doe@email.com',
            accessProfiles: ['SV_WS01', 'SV_WS02', 'SV_WS03', 'SV_WS04', 'SV_WS05'],
        }
    }
    const user = await fetchUser()

    if (!user.accessProfiles.length)
        return {
            props: { isAuthorized: false },
        }

    // fetch namespace data based on the user's accessProfiles
    const fetchNamespaces = async () => {
        let response
        try {
            response = await pgPool.query('SELECT uuid, name FROM secret_vault.namespaces WHERE accessProfile = ANY($1::text[]);', [
                user.accessProfiles,
            ])
        } catch (error: unknown) {
            console.error(error)
        }

        const { rows } = response
        return rows
    }
    const namespaces = await fetchNamespaces()

    // in production if a accessProfile exists, the namespace should be also registered in the app's db
    // the below if statement written for non-prod special cases
    if (!namespaces.length) {
        return {
            redirect: {
                destination: '/namespace-404',
            },
            props: {},
        }
    }
    return { user, namespaces }
}
