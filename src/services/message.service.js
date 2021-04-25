import { axiosInstance } from "./axios";
class MessageService {
  getAllMessage(page, limit) {
    return axiosInstance.get(`/api/message/list?page=${page}&limit=${limit}`);
  }
  getMessageByChannelType(page, limit, type) {
    return axiosInstance.get(
      `/api/message/list-by-channel-type?page=${page}&limit=${limit}&type=${type}`
    );
  }
  createMessage(message) {
    return axiosInstance.post("/api/message/create", message);
  }
}

export default new MessageService();
