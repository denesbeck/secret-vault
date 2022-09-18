import pgPool from 'libs/pgPool'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function references(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { wsUuid, envUuid, secretUuid } = req.body

        let response
        try {
            response = await pgPool.query(
                'INSERT INTO secret_vault.x_reference (ns_uuid, env_uuid, secret_uuid) VALUES ($1, $2, $3) RETURNING *;',
                [wsUuid, envUuid, secretUuid]
            )
        } catch (error: unknown) {
            return res.status(500).json(error)
        }
        const { rows } = response

        return res.status(200).json(rows[0])
    }
}
