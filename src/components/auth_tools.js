import {apiPath} from "../config";

export function do_auth(username, password){
    return fetch(apiPath+"/auth/log?username=" + username + "&password=" + password, {method: "GET",credentials:"include"})
        .then(res => res.ok ? res : Promise.reject(res))
        .then(data => {
            return data.json()
        })
        .then(data => {
            return data
        })
        .catch(() => {
            return null
        });
}
export function register(username,password){
    return fetch(apiPath+"/auth/reg?username=" + username + "&password=" + password, {method: "GET",credentials:"include"})
        .then(res => res.ok ? res : Promise.reject(res))
        .then(data => {
            return data.json()
        })
        .then(data => {
            return data
        })
        .catch(() => {
            return null
        });
}
export function exitf(){
    return fetch(apiPath+"/auth/exit", {method: "GET",credentials:"include"})
        .then(res => res.ok ? res : Promise.reject(res))
        .then(data => {
            return data.json()
        })
        .then(data => {
            return data
        })
        .catch(() => {
            return null
        });
}