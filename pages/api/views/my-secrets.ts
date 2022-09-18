import type { NextApiRequest, NextApiResponse } from 'next'
import pgPool from 'libs/pgPool'
import { SecretSchema } from 'interfaces/schemas'
import { decrypt } from 'libs/cryptoJs'

export default async function mySecrets(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const userEmail = req.query.userEmail as string

        let response
        try {
            response = await pgPool.query(
                `SELECT name, api_key, owner_name, owner_email, username, password, expiration_date, environments
                FROM secret_vault.secrets_main_v2
                WHERE owner_email=$1
                ORDER BY name;`,
                [userEmail]
            )
        } catch (error: unknown) {
            return res.status(500).json(error)
        }

        const { rows } = response

        let resultSet = [...rows]
        resultSet.forEach((el: SecretSchema) => {
            el.api_key = process.env.SECRET_PREFIX + '-' + decrypt(el.api_key)
            el.username = decrypt(el.username)
            el.password = decrypt(el.password)
        })

        return res.status(200).json(resultSet)
    }
}
