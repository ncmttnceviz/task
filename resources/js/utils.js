import {AES, enc} from 'crypto-js';

const secretKey = 'wxelEreGDv'

export const setUser = (key, user) => {
    const data = AES.encrypt(JSON.stringify(user), secretKey)
    window.localStorage.setItem(key, data.toString())
}


export const getUser = (key) => {
    const user = window.localStorage.getItem(key)
    if (!user) {
        return false
    }
    const bytes = AES.decrypt(user, secretKey);
    return JSON.parse(bytes.toString(enc.Utf8))
}

export const removeUser = (key) => {
    window.localStorage.removeItem(key)
}
