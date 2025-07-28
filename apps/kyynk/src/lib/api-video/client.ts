import ApiVideoClient from '@api.video/nodejs-client';

const apiVideoClient = new ApiVideoClient({
  apiKey: process.env.API_VIDEO_KEY,
});

export default apiVideoClient;
