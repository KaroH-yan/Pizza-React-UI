import requests from './base-service';

const Auth = {
    login: (email, password) =>
        requests.post('/login', {email, password}),
};

export default Auth;
