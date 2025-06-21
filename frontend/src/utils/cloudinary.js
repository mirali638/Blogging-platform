// Mock Cloudinary upload helper
export const uploadToCloudinary = async (file) => {
  // This is a mock. In a real app, you would use Cloudinary's API.
  return Promise.resolve({
    url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    public_id: "sample",
  });
}; 