import { EnvironmentSchema } from 'interfaces/schemas'
import { decrypt } from 'libs/cryptoJs'
import pgPool from 'libs/pgPool'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function environments(req: NextApiRequest, res: NextApiResponse) {
    /*
     *  Retrieve environment data on application level.
     */
    if (req.method === 'GET') {
        const { uuid } = req.query

        let response
        try {
            response = await pgPool.query(
                'SELECT uuid, api_key, archetype AS archetype_uuid, name, app_uuid FROM secret_vault.environments WHERE app_uuid = $1 ORDER BY name ASC;',
                [uuid]
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
    if (req.method === 'DELETE') {
        const { uuid } = req.query

        let response
        try {
            await pgPool.query('BEGIN')
            response = await pgPool.query('DELETE FROM secret_vault.environments WHERE uuid = $1 RETURNING *;', [uuid])
            await pgPool.query('DELETE FROM secret_vault.x_reference WHERE env_uuid = $1;', [uuid])
            await pgPool.query('COMMIT')
        } catch (error: unknown) {
            await pgPool.query('ROLLBACK')
            return res.status(500).json(error)
        }
        const { rows } = response

        res.status(200).json(rows[0])
    }
    if (req.method === 'PUT') {
        const { uuid } = req.query
        const { envName } = req.body

        let response
        try {
            response = await pgPool.query('UPDATE secret_vault.environments SET name = $1 WHERE uuid = $2 RETURNING *;', [envName, uuid])
        } catch (error: unknown) {
            return res.status(500).json(error)
        }
        const { rows } = response

        return res.status(200).json(rows[0])
    }
}
