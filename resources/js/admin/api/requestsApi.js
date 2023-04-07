import adminApi from "../adminApi";

export const getRequests = async (page) => {
    return await adminApi.get(`/point_requests?page=${page}`);
}

export const filterRequests = async (filters, page) => {
    const formData = new FormData();
    Object.entries(filters).forEach((filter) => {
        if (filter[1]) {
            formData.append(filter[0], filter[1])
        }
    })
    return await adminApi.post(`/point_requests?page=${page}`, formData)
}


export const updateState = async (requestId, point, state) => {
    return await adminApi.put(`/point_requests/${requestId}/point/${point}/state/${state}`)
}
