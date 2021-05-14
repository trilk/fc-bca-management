import { axiosInstance } from "./axios";
class AudienceService {
  getAllAudience(page, limit) {
    return axiosInstance.get(`/api/audience/list?page=${page}&limit=${limit}`);
  }
  getAudienceByChannelType(page, limit, type) {
    return axiosInstance.get(
      `/api/contact/list-by-channel-type?page=${page}&limit=${limit}&type=${type}`
    );
  }
  getDetailById(id) {
    return axiosInstance.get(`/api/contact/profile/${id}`);
  }
}

export default new AudienceService();
