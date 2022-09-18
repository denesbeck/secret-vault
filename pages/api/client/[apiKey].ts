import { hash, decrypt } from 'libs/cryptoJs'
import pgPool from 'libs/pgPool'
import type { NextApiRequest, NextApiResponse } from 'next'

type SecretApiResponse = {
    name: string
    username: string
    password: string
}

export default async function clientSecrets(req: NextApiRequest, res: NextApiResponse) {
    if (!process.env.SECRET_PREFIX || !process.env.ENV_PREFIX)
        return res.status(500).send('Secret or Application prefix environment variable was/were not defined. Please contact IT team.')

    const { apiKey } = req.query
    if (typeof apiKey !== 'string') throw new Error('Invalid API key format.')

    if (req.method === 'GET') {
        let response
        try {
            const coreApiKey = apiKey.substring(apiKey?.indexOf('-') + 1)
            const apiKeyHash = hash(coreApiKey)

            // Check whether the data of a single secret or multiple secrets belonging to a certain application has been requested
            if (apiKey.startsWith(process.env.SECRET_PREFIX)) {
                response = await pgPool.query('SELECT name, username, password FROM secret_vault.secrets WHERE api_key_hash=$1;', [
                    apiKeyHash,
                ])
            }

            if (apiKey.startsWith(process.env.ENV_PREFIX)) {
                response = await pgPool.query(
                    `SELECT C.name, C.username, C.password
                FROM secret_vault.secrets AS C

                JOIN secret_vault.x_reference AS X
                ON X.secret_uuid = C.uuid

                JOIN secret_vault.environments AS E
                ON E.uuid = X.env_uuid

                WHERE E.api_key_hash=$1 ORDER BY C.name ASC ;`,
                    [apiKeyHash]
                )
            }
            if (!response.rowCount) return res.status(404).send('Server returned zero records.')

            const { rows } = response

            let resultSet: unknown[] = []

            rows.forEach((secret: SecretApiResponse) => {
                const usrKey = secret.name.toUpperCase().replace(/ /g, '_') + '_USR'
                const pwdKey = secret.name.toUpperCase().replace(/ /g, '_') + '_PWD'

                type UnknownObject = { [key: string]: string }

                const tempObject: UnknownObject = {}

                tempObject[usrKey] = decrypt(secret.username)
                tempObject[pwdKey] = decrypt(secret.password)

                resultSet.push(tempObject)
            })

            return res.status(200).json(apiKey.startsWith(process.env.SECRET_PREFIX) ? resultSet[0] : resultSet)
        } catch (error: unknown) {
            return res.status(500).json(error)
        }
    }
}
