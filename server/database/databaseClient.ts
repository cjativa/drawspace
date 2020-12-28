
import { Pool } from 'pg';
import Config from '../utils/config';

const pool = new Pool({
    host: Config.databaseHost,
    database: Config.databaseName,
    user: Config.databaseUser,
    password: Config.databasePassword,
    port: 5432
});

export default class DatabaseClient {

    /** Maintain connection to the database pool */
    private static pool: Pool = pool;

    /** Performs the provided query, adding in any provided values to be sanitized and substituted in the query */
    public static async performQuery<T>(query: string, values?: any[]): Promise<T[]> {

        let response;

        // Check out a client
        const client = await this.pool.connect();

        try {
            // Execute the query
            response = (values)
                ? await client.query(query, values)
                : await client.query(query)
                ;
        }

        catch (error) {
            console.log(`An error occurred executing query: ${query}`, error);
            throw error;
        }

        finally {
            //  Release the client
            client.release()
        }

        return response?.rows!;
    };
};