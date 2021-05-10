import { axiosInstance } from './axios';

class UserService {
  getProfile() {
    try {
      return axiosInstance.get('api/user/profile');
    } catch {
      return null;
    }
  }

  getUsers(query) {
    try {
      return axiosInstance.get('api/user/list' + query);
    } catch {
      return [];
    }
  }


}

export default new UserService();
