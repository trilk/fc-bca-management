import { axiosInstance } from './axios';
import _ from 'lodash'

class UserService {
  saveUser(user, isCreateNew) {
    // user.roles = [user.role];
    if (isCreateNew) {
      return axiosInstance.post("/api/user/create", user);
    } else {
      const { createdAt, updatedAt, ...updateUser } = user;
      return axiosInstance.post("/api/user/update", updateUser);
    }
  }

  getProfile() {
    return axiosInstance.get('api/user/profile');
  }

  getUserInfo(query) {
    return axiosInstance.get('api/user/info' + query);
  }

  getUsers(query) {
    return axiosInstance.get('api/user/list' + query);
  }


}

export default new UserService();
