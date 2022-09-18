import { EnvironmentSchema } from 'interfaces/schemas'
import { decrypt, encrypt, genHexString, hash } from 'libs/cryptoJs'
import pgPool from 'libs/pgPool'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function environments(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { appUuid, archetype, envName } = req.body

        const apiKey = genHexString(16)
        const apiKeyHash = hash(apiKey)
        const encryptedApiKey = encrypt(apiKey)

        let response
        try {
            response = await pgPool.query(
                'INSERT INTO secret_vault.environments (app_uuid, api_key, api_key_hash, archetype, name) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
                [appUuid, encryptedApiKey, apiKeyHash, archetype, envName]
            )
        } catch (error: unknown) {
            return res.status(500).json(error)
        }
        const { rows } = response

        res.status(200).json(rows[0])
    }
    if (req.method === 'GET' && req.query.secretUuid) {
        /*
         *  Retrieve some namespace, application and environment data
         *  and check whether the secret is linked to an environment
         *  (if linked ref_uuid is not null).
         */
        const { wsUuids, secretUuid } = req.query
        const parsedArray = JSON.parse(wsUuids as string)

        let response
        try {
            response = await pgPool.query(
                `SELECT DISTINCT E.uuid, E.api_key, E.name, A.ns_uuid, W.name AS ws_name, E.app_uuid, A.name AS app_name, A.owner_email, E.archetype AS archetype_uuid,
                (SELECT X.uuid AS ref_uuid FROM secret_vault.x_reference AS X WHERE X.env_uuid = E.uuid AND X.secret_uuid = $1)
                FROM secret_vault.environments AS E

                JOIN secret_vault.applications AS A
                ON E.app_uuid = A.uuid

                JOIN secret_vault.namespaces AS W
                ON W.uuid = A.ns_uuid

                WHERE A.ns_uuid = ANY($2::uuid[]) ORDER BY W.name, A.name, E.name ASC;`,
                [secretUuid, parsedArray]
            )
        } catch (error: unknown) {
            return res.status(500).json(error)
        }

        const { rows } = response

        rows.forEach((row: EnvironmentSchema) => {
            row.api_key = process.env.ENV_PREFIX + '-' + decrypt(row.api_key)
        })

        return res.status(200).json(rows)
    }
    if (req.method === 'GET' && !req.query.secretUuid) {
        /*
         *  Retrieve some namespace, application and environment data
         *  and check whether the secret is linked to an environment
         *  (if linked ref_uuid is not null).
         */
        const { wsUuids } = req.query
        const parsedArray = JSON.parse(wsUuids as string)

        let response
        try {
            response = await pgPool.query(
                `SELECT DISTINCT E.uuid, E.api_key, E.name, A.ns_uuid, W.name AS ws_name, E.app_uuid, A.name AS app_name, A.owner_email, E.archetype AS archetype_uuid
                FROM secret_vault.environments AS E

                JOIN secret_vault.applications AS A
                ON E.app_uuid = A.uuid

                JOIN secret_vault.namespaces AS W
                ON W.uuid = A.ns_uuid

                WHERE A.ns_uuid = ANY($1::uuid[]) ORDER BY W.name, A.name, E.name ASC;`,
                [parsedArray]
            )
        } catch (error: unknown) {
            return res.status(500).json(error)
        }

        const { rows } = response

        rows.forEach((row: EnvironmentSchema) => {
            row.api_key = process.env.ENV_PREFIX + '-' + decrypt(row.api_key)
        })

        return res.status(200).json(rows)
    }
}
