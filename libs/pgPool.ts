const { Pool } = require('pg')

export default new Pool({
    connectionString: process.env.PG_CONN_STRING,
})
