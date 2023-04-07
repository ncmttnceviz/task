import axios from 'axios';
import {getUser} from "../utils";

export const baseURL = '/admin-api';

const apiClient = () => {
    const instance = axios.create();
    instance.interceptors.request.use(async (request) => {

        let bearerToken;
        const token = getUser('appOne')?.token;

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
                window.location.href = '/admin/login'
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
