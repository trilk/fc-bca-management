import { axiosInstance } from './axios';

class AuthService {
    login(userData) {
        return axiosInstance
            .post("/api/auth/login", userData)
            .then((response) => {
                // if (response.data.accessToken) {
                //     localStorage.setItem("user", JSON.stringify(response.data));
                // }

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