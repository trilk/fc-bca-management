import { axiosInstance } from './axios';

class AuthService {
    login(userData) {
        return axiosInstance
            .post("/api/auth/signin", userData)
            .then((response) => {
                return response.data;
            });
    }

    logout() {
        // localStorage.removeItem("user");
    }

    register(userData) {
        return axiosInstance.post("/api/auth/register", userData);
    }
}

export default new AuthService();