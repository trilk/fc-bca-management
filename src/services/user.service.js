import { axiosInstance } from './axios';
import _ from 'lodash'
import * as firebase from 'src/firebase'

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

  async getUsers(query) {
    return [];
    // const teamIds = await firebase.db.collection(`users/${userId}/teams`).get();
    // const teams = await Promise.all(
    //   teamIds.docs.map(async (doc) => {
    //     const team = await firebase.db.doc(`teams/${doc.id}`).get();
    //     const user_team = await firebase.db.doc(`teams/${doc.id}/users/${userId}`).get();
    //     return Object.assign({}, user_team.data(), team.data());
    //   })
    // );
    // // teams.map(doc => { console.log(doc.data()); });
    // console.log(teams);
  }


}

export default new UserService();
