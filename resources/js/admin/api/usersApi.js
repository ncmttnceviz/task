import adminApi from "../adminApi";

export const getUsers = async () => {
    return await adminApi.get(`users`);
}

