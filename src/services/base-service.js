import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import agent from "../utils/agent";

import {
    API_ROOT
} from '../config';

const superagent = superagentPromise(_superagent, global.Promise);


const encode = encodeURIComponent;
const responseBody = res => res.body;
let token = (window.localStorage.getItem('token'))?window.localStorage.getItem('token'):null;

const tokenPlugin = req => {
    let token = (window.localStorage.getItem('token'))?window.localStorage.getItem('token'):null;
    if (token) {
        req.set('authorization', `${token}`);
    }
    req.set('Accept-Language', `ru`);
};

agent.setToken(token);
const requests = {
    del: url =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    putFile: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

export default requests;
