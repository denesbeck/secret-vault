import pgPool from 'libs/pgPool'
import { filterData } from 'utils/filterData'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function applications(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, ownerName, ownerEmail, namespace } = req.body

        let response
        try {
            response = await pgPool.query(
                'INSERT INTO secret_vault.applications (name, owner_name, owner_email, ns_uuid) VALUES ($1, $2, $3, $4) RETURNING *;',
                [name, ownerName, ownerEmail, namespace]
            )
        } catch (error: unknown) {
            return res.status(500).json(error)
        }
        const data = response.rows[0]

        return res.status(200).json(data)
    }
    if (req.method === 'GET') {
        const { wsUuids, userEmail, filterString } = req.query
        const wsUuidsJSON = JSON.parse(wsUuids as string)

        let response
        try {
            response = await pgPool.query(
                `SELECT A.uuid, A.name, A.owner_name, A.owner_email, W.uuid as ns_uuid, W.name AS ws_name
                FROM secret_vault.applications A
                JOIN secret_vault.namespaces AS W
                ON A.ns_uuid = W.uuid
                WHERE A.ns_uuid = ANY($1::uuid[]) ${userEmail ? 'AND A.owner_email = $2' : ''}
                ORDER BY A.inserted ASC;`,
                userEmail ? [wsUuidsJSON, userEmail] : [wsUuidsJSON]
            )
        } catch (error: unknown) {
            return res.status(500).json(error)
        }

        const { rows } = response

        let result = rows
        if ((filterString as string).length) {
            const COLUMNS = ['name', 'owner_name', 'owner_email', 'ws_name']
            result = filterData(rows, filterString as string, COLUMNS)
        }

        res.status(200).json(result)
    }
}
