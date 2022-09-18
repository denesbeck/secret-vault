import { encrypt } from 'libs/cryptoJs'
import pgPool from 'libs/pgPool'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function secrets(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { uuid } = req.query

        let response
        try {
            await pgPool.query('BEGIN')
            response = await pgPool.query('DELETE FROM secret_vault.secrets WHERE uuid=$1 RETURNING *;', [uuid])
            await pgPool.query('DELETE FROM secret_vault.x_reference WHERE secret_uuid=$1 RETURNING *;', [uuid])
            await pgPool.query('COMMIT')
        } catch (error: unknown) {
            await pgPool.query('ROLLBACK')
            return res.status(500).json(error)
        }
        const { rows } = response

        return res.status(200).json(rows[0])
    }
    if (req.method === 'PUT') {
        const { uuid } = req.query
        const { name, username, password, expirationDate } = req.body

        let response
        try {
            response = await pgPool.query(
                'UPDATE secret_vault.secrets SET name=$1, username=$2, password=$3, expiration_date=$4 WHERE uuid=$5 RETURNING *;',
                [name, encrypt(username), encrypt(password), expirationDate, uuid]
            )
        } catch (error: unknown) {
            return res.status(500).json(error)
        }
        const { rows } = response

        return res.status(200).json(rows[0])
    }
}
