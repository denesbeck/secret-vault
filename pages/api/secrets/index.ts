import { SecretSchema } from 'interfaces/schemas'
import { decrypt, encrypt, genHexString, hash } from 'libs/cryptoJs'
import pgPool from 'libs/pgPool'
import type { NextApiRequest, NextApiResponse } from 'next'
import { filterData } from 'utils/filterData'

export default async function secrets(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, ownerName, ownerEmail, username, password, expirationDate } = req.body

        const encryptedUsername = encrypt(username)
        const encryptedPassword = encrypt(password)
        const apiKey = genHexString(16)
        const apiKeyHash = hash(apiKey)
        const encryptedApiKey = encrypt(apiKey)

        let response
        try {
            response = await pgPool.query(
                'INSERT INTO secret_vault.secrets (name, api_key, api_key_hash, owner_name, owner_email, username, password, expiration_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
                [name, encryptedApiKey, apiKeyHash, ownerName, ownerEmail, encryptedUsername, encryptedPassword, expirationDate]
            )
        } catch (error: unknown) {
            return res.status(500).json(error)
        }
        const data = response.rows[0]

        return res.status(200).json(data)
    }
    if (req.method === 'GET') {
        let response
        const { wsUuids, userEmail, showAll, showOwnedOnly, filterString, environments } = req.query
        const wsArray = JSON.parse(wsUuids as string)

        const { script, params } = buildQuery(showAll as string, showOwnedOnly as string, wsArray, userEmail as string)

        try {
            response = await pgPool.query(script, params)
        } catch (error: unknown) {
            return res.status(500).json(error)
        }
        const { rows } = response

        // Concat the SECRET_PREFIX to the api_key of each secret
        // Decrypt the password of each secret
        let resultSet = [...rows]
        resultSet.forEach((el: SecretSchema) => {
            el.api_key = process.env.SECRET_PREFIX + '-' + decrypt(el.api_key)
            el.username = decrypt(el.username)
            el.password = decrypt(el.password)
        })

        if ((filterString as string).length) {
            const COLUMNS = ['username', 'owner_name', 'expiration_date', 'name']
            resultSet = filterData(resultSet, filterString as string, COLUMNS)
        }

        const envArray = environments === 'null' ? null : JSON.parse(environments as string)
        if (!envArray) return res.status(200).json(resultSet)
        if (!envArray.length) return res.status(200).json(resultSet.filter((secrets: SecretSchema) => !secrets.environments.length))

        resultSet = resultSet.filter(
            (row: SecretSchema) => row.environments.some((env: string) => envArray.includes(env)) || !row.environments.length
        )

        return res.status(200).json(resultSet)
    }
}

const buildQuery = (showAll: string, showOwnedOnly: string, wsArray: string[], userEmail: string) => {
    const castedShowAll = showAll === 'true'
    const castedShowOwnedOnly = showOwnedOnly === 'true'

    const calculateComboType = () => {
        if (castedShowAll && !castedShowOwnedOnly) return 'UNION'
        if (!castedShowAll && castedShowOwnedOnly) return 'INTERSECT'
    }

    const doubleFalse = !castedShowAll && !castedShowOwnedOnly
    const doubleFalseScript = `SELECT uuid, name, api_key, owner_name, owner_email, username, password, expiration_date, inserted::text, namespaces, environments, tags
                FROM secret_vault.secrets_main_v1 WHERE namespaces && $1
                ORDER BY name ASC;`

    const doubleTrue = castedShowAll && castedShowOwnedOnly
    const doubleTrueScript = `(SELECT uuid, name, api_key, owner_name, owner_email, username, password, expiration_date, inserted::text, namespaces, environments, tags
                FROM secret_vault.secrets_main_v1 WHERE owner_email = $2)
                INTERSECT
                (SELECT uuid, name, api_key, owner_name, owner_email, username, password, expiration_date, inserted::text, namespaces, environments, tags
                FROM secret_vault.secrets_main_v1 WHERE namespaces && $1 OR namespaces = '{}')
                ORDER BY name ASC;`

    const defaultScript = `(SELECT uuid, name, api_key, owner_name, owner_email, username, password, expiration_date, inserted::text, namespaces, environments, tags
                FROM secret_vault.secrets_main_v1 WHERE owner_email = $2)
                ${calculateComboType()}
                (SELECT uuid, name, api_key, owner_name, owner_email, username, password, expiration_date, inserted::text, namespaces, environments, tags
                FROM secret_vault.secrets_main_v1 WHERE namespaces && $1)
                ORDER BY name ASC;`
    const defaultParams = [wsArray, userEmail]

    let script = defaultScript
    let params = defaultParams

    if (doubleFalse) {
        script = doubleFalseScript
        params = [wsArray]
    }
    if (doubleTrue) script = doubleTrueScript

    return { script, params }
}
