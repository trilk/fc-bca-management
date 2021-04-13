import axios from "axios";

const API_URL = "http://localhost:5000/api/channel/";

class ChannelService {
  checkChannelExist(type) {
    return axios.get(API_URL + `channel-exist?type=${type}`);
  }
}

export default new ChannelService();
