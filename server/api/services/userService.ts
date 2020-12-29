import DatabaseClient from '../../database/databaseClient';
import shortid from 'shortid';

export interface IUser {
    id: number,
    name: string,
    username: string,
    password?: string
};

export interface IDrawing {
    id: number,
    user_id: number,
    elapsed_time: number,
    creation_time: string,
    public: boolean,
    public_url: string
};

export default class UserService {

    /** Retrieves information for the user */
    public static async getUserDetails(userId: number): Promise<IUser> {

        // Grab the stored credentials for this user
        const user = (await DatabaseClient.performQuery<IUser>(`
         SELECT id, name, username
         FROM "users"
         WHERE id = $1
         `, [userId])).pop();

        return user;
    };

    /** Persists a drawing for a user */
    public static async saveDrawing(userId: number, drawingData: string, timeElapsed: number, isPublic: boolean): Promise<IDrawing> {

        // The creation time and short id for public url
        const creationTime = new Date(Date.now());
        const publicUrl = shortid.generate();

        // Persist the drawing
        const drawing = (await DatabaseClient.performQuery<IDrawing>(`
         INSERT into "drawings" (
             user_id
             ,data
             ,elapsed_time
             ,creation_time
             ,public
             ,public_url
         ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
         `, [userId, drawingData, timeElapsed, creationTime, isPublic, publicUrl])).pop();

        return drawing;
    };

    /** Retrieves drawings for a user */
    public static async getDrawings(userId: number): Promise<IDrawing[]> {

        // Persist the drawing
        const drawings = (await DatabaseClient.performQuery<IDrawing>(`
         SELECT * 
         FROM "drawings"
         WHERE user_id = $1
         `, [userId]));

        return drawings;
    };
};