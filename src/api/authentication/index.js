import axios from 'axios';
import rand from 'rand-token';

class _AuthService {

    constructor() {
        this.baseUrl = "http://localhost:3000";
    }

    login(form, duration, bool = true) {
        return new Promise((resolve, reject) => (
            setTimeout(() => bool ? resolve({
                token: rand.generate(7)
            }) : reject({
                message: 'Login failed'
            }), duration * 1000)
        ));
    }
}

// sample data: 
// https://jsonplacehol_der.typicode.com/posts/1

const AuthService = new _AuthService();

export { AuthService };