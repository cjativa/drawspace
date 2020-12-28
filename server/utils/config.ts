import dotenv from 'dotenv';

dotenv.config();

const Config = {

    /** Port the server runs on */
    port: process.env.PORT!,

    /** Database credentials */

    /** Hostname for the database */
    databaseHost: process.env.DATABASE_HOST!,

    /** Name for the database schema */
    databaseName: process.env.DATABASE_NAME!,

    /** Authorized user for the database */
    databaseUser: process.env.DATABASE_USER!,

    /** Password for the database */
    databasePassword: process.env.DATABASE_PASSWORD!,

    /** Secret key for encrypting passwords */
    encryptionSecretKey: process.env.ENCRYPTION_SECRET_KEY!,

    /** Secret key for signing JWT */
    jwtSecretKey: process.env.JWT_SECRET_KEY!
};

export default Config;