import cloudinary from "../cloudinary";

const search = (id) => {
  return cloudinary.get(`resources/image/upload/${id}`);
};

const upload = (data, name) => {
  const formData = new FormData();
  formData.append("file", data);
  formData.append("folder", "invoice");
  formData.append("upload_preset", "sYmb@l1C");
  // formData.append("public_id", name + ".png");

  return cloudinary.post(`/image/upload`, formData);
};

const cloudinaryService = { upload, search };
export default cloudinaryService;
