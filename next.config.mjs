/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

images: {
// Option A: simple allow-list
domains: [
'lh3.googleusercontent.com', // Google profile images
'i.ibb.co.com', // if you use icons8 avatars
'img.icons8.com'
]}

};

export default nextConfig;
