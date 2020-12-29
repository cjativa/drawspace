import ApiService from './apiService';

export interface AuthenticationResponse {
    success: boolean,
    message?: string,
    token?: string
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
        if (response.status === 200) {

            // Update the API service as we're now authenticated
            const { token } = response.data;

            return {
                success: true,
                token
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

    /** Performs request to the API for signing up this user */
    public static async performSignUp(name: string, username: string, password: string): Promise<AuthenticationResponse> {

        const response = await ApiService.performRequest({
            endpoint: 'auth/sign-up',
            data: { name, username, password },
            method: 'POST'
        });

        // Login was successful
        if (response.status === 200) {

            // Update the API service as we're now authenticated
            const { token } = response.data;

            return {
                success: true,
                token
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
    public static persistLoginState(loggedIn: boolean, token: string) {
        localStorage.setItem('signedIn', loggedIn.toString());
        localStorage.setItem('token', token);
    };

    /** Returns the token from local storage */
    public static getToken(): string {
        return localStorage.getItem('token') || '';
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