import type { NextApiRequest, NextApiResponse } from 'next'
import { DatabaseError } from 'pg'
import pgPool from 'libs/pgPool'

export default async function namespaces(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        let response
        try {
            response = await pgPool.query('INSERT INTO secret_vault.namespaces (name, accessProfile) VALUES ($1, $2) RETURNING *;', [
                req.body.name,
                req.body.accessProfile,
            ])
        } catch (error: unknown) {
            if ((error as DatabaseError).code === '23505') return res.status(400).send('Namespace name must be unique!')
            return res.status(500).json(error)
        }
        const data = response.rows[0]

        return res.status(200).json(data)
    }
}
