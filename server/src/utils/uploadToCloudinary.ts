import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';


export const uploadToCloudinary = (
  file: string,
  options: {},
): Promise<UploadApiResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, options, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
};

export type CloudinaryResponse = UploadApiResponse;

export const cloudinaryUploadOptions = {
  resource_type: 'auto',
  folder: 'phone_catalog',
};
