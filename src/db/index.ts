import { Pool } from 'pg';

export default new Pool({
    max: 50,
    connectionString: 'postgres://rowen@localhost:5432/MarvinData',
    idleTimeoutMillis: 30000,
});