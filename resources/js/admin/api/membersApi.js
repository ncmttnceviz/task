import adminApi from "../adminApi";

export const getMembers = async (page) => {
    return await adminApi.get(`/members?page=${page}`);
}

export const updateFlag = async (memberId, flagId) => {
    return await adminApi.put(`/members/${memberId}/flag/${flagId}`)
}
