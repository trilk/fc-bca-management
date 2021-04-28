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
  getDetailMessageById(id) {
    return axiosInstance.get(`/api/message/detail/${id}`);
  }
  createMessage(message) {
    return axiosInstance.post("/api/message/create", message);
  }
  sendMessage(message) {
    return axiosInstance.post("/api/message/send", message);
  }
}

export default new MessageService();
