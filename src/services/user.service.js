import { axiosInstance } from './axios';

class UserService {
  getProfile() {
    try {
      return axiosInstance.get('api/user/profile');
    } catch {
      return null;
    }
  }

  getUsers() {
    try {
      return axiosInstance.get('api/user/list');
    } catch {
      return [];
    }
  }


}

export default new UserService();
