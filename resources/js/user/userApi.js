import axios from 'axios';
import {getUser} from "../utils";

export const baseURL = '/api/v1';

const apiClient = () => {
    const instance = axios.create();
    instance.interceptors.request.use(async (request) => {

        let bearerToken;
        const token = getUser('appTwo')?.token;

        if (token) {
            bearerToken = `Bearer ${token.replace('"', '').replace('"', '')}`;
        }

        request.baseURL = baseURL

        request.headers = {
            Authorization: bearerToken,
            Accept: 'application/json',
        };

        return request;
    });

    instance.interceptors.response.use(
        (response) => {
            return {
                status: true,
                message: response.data.message,
                errorCode: null,
                data: response.data.data
            }
        },
        (error) => {
            if (error?.response?.status === 401) {
                window.location.href = '/'
            } else {
                return {
                    status: false,
                    message: error.response.data.message,
                    errorCode: error.response.data.errorCode,
                    data: error.response.data.data,
                }
            }
        }
    );

    return instance;
};

export default apiClient();
