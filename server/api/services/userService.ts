import DatabaseClient from '../../database/databaseClient';

export interface IUser {
    id: number,
    name: string,
    username: string,
    password?: string
};

export default class UserService {

    /** Retrieves information for the user */
    public static async getUserDetails(userId: number): Promise<IUser> {

        // Grab the stored credentials for this user
        const user = (await DatabaseClient.performQuery<IUser>(`
         SELECT  *
         FROM "users"
         WHERE id = $1
         `, [userId])).pop();

        delete user.password;
        return user;
    };
};