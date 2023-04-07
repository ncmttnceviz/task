import userApi from "../userApi";

export const makePointRequest = async (point) => {
    return await userApi.post('/points', {point: point});
}

