import {apiPath} from "../config";

export function add_point(x,y,r){
    return fetch(apiPath+"/points/add?x="+x+"&y="+y+"&r="+r, {method: "GET",credentials:"include"})
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
export function get_points(){
    return fetch(apiPath+"/points/get", {method: "GET",credentials:"include"})
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
export function clear_points(){
    return fetch(apiPath+"/points/clear", {method: "GET",credentials:"include"})
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