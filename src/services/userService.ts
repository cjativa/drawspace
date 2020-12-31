import ApiService from './apiService';

export interface IDrawingSave {
    success: boolean,
    publicUrl?: string,
    id?: number
};

export default class UserService {

    /** Performs request for retrieving details for the user */
    public static async retrieveDetails(): Promise<any> {

        const response = await ApiService.performRequest<IDrawingSave>({
            endpoint: 'user',
            method: 'GET'
        });

        // Login was successful
        return response.data
    };
    /** Performs request for saving a drawing to the user's account */
    public static async performDrawingSave(drawingData: string, timeElapsed: number, isPublic: boolean): Promise<IDrawingSave> {

        const response = await ApiService.performRequest<IDrawingSave>({
            endpoint: 'user/draw',
            data: { drawingData, timeElapsed, isPublic },
            method: 'POST'
        });

        // Login was successful
        if (response.status === 200) {
            return {
                success: true,
                publicUrl: response.data.publicUrl,
                id: response.data.id
            }
        }

        // Login was unsuccessful
        else {
            return {
                success: false,
            }
        }
    };

    /** Retrieves all drawings for the user */
    public static async getAllDrawings() {

        const response = await ApiService.performRequest<any[]>({
            endpoint: 'user/drawings',
            method: 'GET'
        });

        // Login was successful
        if (response.status === 200) {
            return response.data
        }

        // Login was unsuccessful
        else {
            return []
        }
    };

    /** Submits a deletion request for the provided drawing */
    public static async deleteDrawing(drawingId: number) {

        const response = await ApiService.performRequest<any[]>({
            endpoint: `user/draw/${drawingId}`,
            method: 'DELETE'
        });
    };

    /** Retrieves all drawings for the user */
    public static async geDrawing(drawingId: string) {

        const response = await ApiService.performRequest<any[]>({
            endpoint: `user/draw/${drawingId}`,
            method: 'GET'
        });

        // Login was successful
        if (response.status === 200) {
            return response.data
        }

        // Login was unsuccessful
        else {
            return []
        }
    };
};