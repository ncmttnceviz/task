import userApi from "../userApi";
import {setUser} from "../../utils";

export const signin = async (email, password) => {
    const response = await userApi.post('/auth/login', {email: email, password: password});

    if (response.status) {
        setUser('appTwo', response.data)
    }
    return response;
}

export const signUp = async (firstname, lastName, email, password, passwordConfirm) => {
    return await userApi.post('/auth/register', {
        firstName: firstname,
        lastName: lastName,
        email: email,
        password: password,
        password_confirmation: passwordConfirm
    });
}
