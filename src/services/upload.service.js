import { axiosInstance } from "./axios";

class UploadService {
  uploadFile(formData) {
    return axiosInstance.post("/upload", formData);
  }
}

export default new UploadService();
