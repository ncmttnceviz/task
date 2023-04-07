import adminApi from "../adminApi";
import {setUser} from "../../utils";

export const signin = async (email, password) => {
    const response = await adminApi.post('/auth/login', {email: email, password: password});

    if (response.status) {
        setUser('appOne', response.data)
    }
    return response;
}
