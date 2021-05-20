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

  deleteUser(userId, username) {
    return axiosInstance.post("/api/user/delete", { _id: userId, username: username });
  }

  getProfile() {
    return axiosInstance.get('api/user/profile');
  }

  getUserInfo(query) {
    try {
      return axiosInstance.get('api/user/info' + query);
    } catch (error) {
      console.log(error)
    }
  }

  getUsers(query) {
    return axiosInstance.get('api/user/list' + query);
  }


}

export default new UserService();
