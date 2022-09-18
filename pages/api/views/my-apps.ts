import type { NextApiRequest, NextApiResponse } from 'next'
import pgPool from 'libs/pgPool'

export default async function myApps(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const userEmail = req.query.userEmail as string

        let response
        try {
            response = await pgPool.query(
                `SELECT LOWER(namespace) AS namespace, LOWER(name) AS name, owner_name, owner_email, secrets
                FROM secret_vault.applications_overview_v1
                WHERE owner_email=$1
                ORDER BY name;`,
                [userEmail]
            )
        } catch (error: unknown) {
            return res.status(500).json(error)
        }

        const { rows } = response

        return res.status(200).json(rows)
    }
}
