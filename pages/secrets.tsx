import type { GetServerSideProps } from 'next'
import { Secrets } from 'components'
import { SWRConfig } from 'swr'
import { SecretSchema, UserSchema, NamespaceSchema } from 'interfaces/schemas'
import pgPool from 'libs/pgPool'
import { loadUserAndNs } from 'utils/loadUserAndNs'
import { useSaveUserAndWs } from 'hooks'
import { decrypt } from 'libs/cryptoJs'

interface SecretsProps {
    isAuthorized: boolean
    user: UserSchema
    namespaces: NamespaceSchema[]
    fallback: { '/api/secrets': SecretSchema[] }
}

export default function Secrets_({ isAuthorized, user, namespaces, fallback }: SecretsProps) {
    useSaveUserAndWs(isAuthorized, user, namespaces)

    if (!isAuthorized) return <div>401 | Unauthorized!</div>
    return (
        <SWRConfig value={{ fallback }}>
            <Secrets />
        </SWRConfig>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { user, namespaces } = await loadUserAndNs()

    // fetch the secrets assigned to the first namespace
    const fetchSecrets = async () => {
        let response
        try {
            response = await pgPool.query(
                `(SELECT uuid, name, api_key, owner_name, owner_email, username, password, expiration_date, inserted::text, namespaces, environments, tags
                FROM secret_vault.secrets_main_v1 WHERE namespaces && $1)
                UNION
                (SELECT uuid, name, api_key, owner_name, owner_email, username, password, expiration_date, inserted::text, namespaces, environments, tags
                FROM secret_vault.secrets_main_v1 WHERE owner_email = $2)
                ORDER BY name ASC`,
                [namespaces.map((ns: NamespaceSchema) => ns.uuid), user!.email]
            )
        } catch (error: unknown) {
            console.error(error)
        }

        const { rows } = response

        // Concat the SECRET_PREFIX to the api_key of each secret
        // Decrypt the password of each secret
        const resultSet = [...rows]
        resultSet.forEach((el: SecretSchema) => {
            el.api_key = process.env.SECRET_PREFIX + '-' + decrypt(el.api_key)
            el.username = decrypt(el.username)
            el.password = decrypt(el.password)
        })

        return resultSet
    }
    const secrets = await fetchSecrets()

    return {
        props: {
            isAuthorized: true,
            user: user,
            namespaces: namespaces,
            fallback: {
                '/api/secrets': secrets,
            },
        },
    }
}
