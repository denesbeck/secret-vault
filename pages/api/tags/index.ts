import pgPool from 'libs/pgPool'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function tags(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { kvs, secretUuid } = req.body
        const parsedKvs = JSON.parse(kvs)

        try {
            await pgPool.query('BEGIN')
            for (const kv of parsedKvs) {
                await pgPool.query('INSERT INTO secret_vault.tags (kv, secret_uuid) VALUES ($1,$2);', [kv, secretUuid])
            }
            await pgPool.query('COMMIT')
        } catch (error: unknown) {
            await pgPool.query('ROLLBACK')
            return res.status(500).json(error)
        }
        return res.status(200).send('Success!')
    }
}
