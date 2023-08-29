import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: 'Post123Code',
    host: 'localhost',
    port: 5432,
    database: 'vivacity',
});

export default pool;