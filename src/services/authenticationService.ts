import ApiService from './apiService';


export interface AuthenticationResponse {
    success: boolean,
    message?: string
}

export default class AuthenticationService {

    /** Performs request to the API for logging in the user */
    public static async performLogin(username: string, password: string): Promise<AuthenticationResponse> {

        const response = await ApiService.performRequest({
            endpoint: 'auth/login',
            data: { username, password },
            method: 'POST'
        });

        // Login was successful
        if (response.status == 200) {

            // Update the API service as we're now authenticated
            const authToken = response.data;
            ApiService.setBearerToken(authToken);

            return {
                success: true,
            }
        }

        // Login was unsuccessful
        else {
            return {
                success: false,
                message: response.data
            }
        }
    };

    /** Persist the login state into local storage */
    public static persistLoginState(loggedIn: boolean) {
        localStorage.setItem('signedIn', loggedIn.toString());
    };

    /** Retrieves the login state */
    public static isLoggedIn(): boolean {

        let lsValue = localStorage.getItem('signedIn') as 'true' | 'false' | null;

        if (lsValue === 'true') {
            return true;
        }

        return false
    }
};