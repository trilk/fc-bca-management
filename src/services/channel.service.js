import { axiosInstance } from "./axios";

class ChannelService {
  listChannelExist() {
    return axiosInstance.get(`/api/channel/channel-exist`);
  }
  uploadFile(formData) {
    return axiosInstance.post("/upload", formData);
  }
}

export default new ChannelService();
