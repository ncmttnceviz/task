import adminApi from "../adminApi";

export const getFlags = async () => {
    return await adminApi.get('/flags');
}

export const addFlag = async (title, colorCode) => {
    return await adminApi.post('/flags', {
        title: title,
        colorCode: colorCode
    })
}
