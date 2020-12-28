import DatabaseClient from '../../database/databaseClient';
import CryptoService from './cryptoService';

export interface IUser {
    id: number,
    name: string,
    username: string,
    password?: string
};

export default class AuthenticationService {

    /** Verifies the credentials match an existing user */
    public static async verifySignInCredentials(username: string, password: string): Promise<IUser> {

        // Encrypt the password so we can find the matching user
        const encryptedPassword = CryptoService.encrypt(password);

        // Grab the stored credentials for this user
        const user = (await DatabaseClient.performQuery<IUser>(`
        SELECT  *
        FROM "users"
        WHERE username = $1
            AND password = $2        
        `, [username, encryptedPassword])).pop();

        return user;
    };

    /** Registers the provided credentials as an account */
    public static async registerCredentials(name: string, username: string, password: string): Promise<IUser> {

        // Encrypt the password for storage
        const encryptedPassword = CryptoService.encrypt(password);

        const createdUser = (await DatabaseClient.performQuery<IUser>(`
        INSERT INTO "users" (
            name
            ,username
            ,password
        ) VALUES ($1, $2, $3) RETURNING *
        `, [name, username, encryptedPassword])).pop();

        return createdUser;
    };

    /** Checks if the provided username is already registered */
    public static async checkUserExistence(username: string): Promise<boolean> {

        const { exists } = (await DatabaseClient.performQuery<{ exists: boolean}>(`
        SELECT EXISTS (
            SELECT 1 FROM "users" 
            WHERE username = $1
        )
        `, [username])).pop();

        return exists;
    };
}