import pgPool from 'libs/pgPool'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function applications(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { uuid } = req.query

        let response
        try {
            await pgPool.query('BEGIN')

            const environments = await pgPool.query('SELECT uuid FROM secret_vault.environments WHERE app_uuid=$1;', [uuid])
            const envUuids = environments.rows.map((env: { uuid: string }) => env.uuid)
            await pgPool.query('DELETE FROM secret_vault.environments WHERE uuid = ANY($1::uuid[]);', [envUuids])

            await pgPool.query('DELETE FROM secret_vault.x_reference WHERE env_uuid = ANY($1::uuid[]);', [envUuids])

            response = await pgPool.query('DELETE FROM secret_vault.applications WHERE uuid = $1 RETURNING *;', [uuid])

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
        const { name, namespace } = req.body

        let response
        try {
            response = await pgPool.query('UPDATE secret_vault.applications SET name = $1, ns_uuid = $2 WHERE uuid = $3;', [
                name,
                namespace,
                uuid,
            ])
        } catch (error: unknown) {
            return res.status(500).json(error)
        }
        const { rows } = response

        return res.status(200).json(rows[0])
    }
}
