import axios from "axios";
import authHeader from "./authToken";

const API_URL = process.env.REACT_APP_API_URL + "api/contact/";

class AudienceService {
  getAllAudience(page, limit) {
    return axios.get(API_URL + `list?page=${page}&limit=${limit}`);
  }
  getAudienceByChannelType(page, limit, type) {
    return axios.get(
      API_URL + `list-by-channel-type?page=${page}&limit=${limit}&type=${type}`
    );
  }
}

export default new AudienceService();
