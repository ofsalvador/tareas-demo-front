
import axios from "axios";
import url from "url";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

let get  = null;
let post = null;
let put  = null;
let del  = null;

let urlBase = process.env.REACT_APP_API_URL || "http://localhost:8080";

axios.defaults.timeout = 20000;

const getHeaders = () => {
    let headers = {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8'
    };
   
    return headers;

};

get  = (endpoint, opt = {}) => {
    const ep = new URL(endpoint, urlBase);
    return axios.get(ep, {params: opt.queryStringParameters, headers:getHeaders()})
    .then(resp => resp.data)
    .catch(error => {
         return Promise.reject(error);
    });
};

post = (endpoint, body) => {
    const ep = url.resolve(urlBase, endpoint);
    return axios.post(ep, body, {headers:getHeaders()})
    .then(resp => resp.data)
    .catch(error => {
        return Promise.reject(error);
    });
};

put  = (endpoint, body,opt = {}) => {
    const ep = url.resolve(urlBase, endpoint);
    return axios.put(ep, body, {params: opt.queryStringParameters, headers:getHeaders()})
    .then(resp => resp.data)
    .catch(error => {
        return Promise.reject(error);
    });
};

del  = (endpoint, opt = {}) => {
    const ep = url.resolve(urlBase, endpoint);
    return axios.delete(ep, {params: opt.queryStringParameters, headers:getHeaders()})
    .then(resp => resp.data)
    .catch(error => {
        return Promise.reject(error);
    });
};



export const Get  = get;
export const Post = post;
export const Put  = put;
export const Del  = del;
