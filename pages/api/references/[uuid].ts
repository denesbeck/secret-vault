import pgPool from 'libs/pgPool'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function references(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { uuid } = req.query

        let response
        try {
            response = await pgPool.query('DELETE FROM secret_vault.x_reference WHERE uuid = $1 RETURNING *;', [uuid])
        } catch (error: unknown) {
            return res.status(500).json(error)
        }
        const { rows } = response

        return res.status(200).json(rows[0])
    }
}
