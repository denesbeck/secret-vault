import pgPool from 'libs/pgPool'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function tags(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { uuid } = req.query

        let response
        try {
            response = await pgPool.query('SELECT uuid, kv FROM secret_vault.tags WHERE secret_uuid = $1;', [uuid])
        } catch (error: unknown) {
            return res.status(500).json(error)
        }
        const { rows } = response

        return res.status(200).json(rows)
    }
    if (req.method === 'DELETE') {
        const { uuid } = req.query

        let response
        try {
            response = await pgPool.query('DELETE FROM secret_vault.tags WHERE uuid = $1 RETURNING *;', [uuid])
        } catch (error: unknown) {
            return res.status(500).json(error)
        }
        const { rows } = response

        return res.status(200).json(rows[0])
    }
}
