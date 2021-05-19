import { axiosInstance } from "./axios";
class AudienceService {
  getAllAudience(page, limit) {
    return axiosInstance.get(`/api/audience/list?page=${page}&limit=${limit}`);
  }
  getDetailById(id) {
    return axiosInstance.get(`/api/audience/detail/${id}`);
  }
}

export default new AudienceService();
