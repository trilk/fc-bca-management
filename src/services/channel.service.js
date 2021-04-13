import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "api/channel/";

class ChannelService {
  checkChannelExist(type) {
    return axios.get(API_URL + `channel-exist?type=${type}`);
  }
}

export default new ChannelService();
