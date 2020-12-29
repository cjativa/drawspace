import axios, { Method, AxiosResponse } from 'axios';
import AuthenticationService from './authenticationService';

export interface APIRequestConfig {

    endpoint: string,
    method: Method,
    data?: { [key: string]: any }
};

export default class ApiService {

    private static bearerToken: string;

    public static setBearerToken(token: string) {
        ApiService.bearerToken = token;
    };

    public static async performRequest<T>(config: APIRequestConfig): Promise<AxiosResponse<any>> {

        let response: AxiosResponse;

        // The fully formed API url and headers
        const url = `/api/${config.endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AuthenticationService.getToken()}`
        }

        try {
            response = await axios({
                url,
                headers,
                method: config.method,
                data: config.data
            });
        }

        catch (error) {
            response = error.response;
            
            if (response.status === 403) {
                AuthenticationService.persistLoginState(false, '');
            }
        }

        return response;
    };
};