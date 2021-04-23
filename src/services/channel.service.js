import { axiosInstance } from "./axios";

class ChannelService {
  checkChannelExist(type) {
    return axiosInstance.get(`/api/channel/channel-exist?type=${type}`);
  }
  uploadFile(formData) {
    return axiosInstance.post("/upload", formData);
  }
}

export default new ChannelService();
