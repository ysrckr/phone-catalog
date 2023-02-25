import cors from 'cors';

export const adminCors = cors({
  origin: process.env.ADMIN_URL,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
});

const whiteList = [process.env.ADMIN_URL, process.env.CLIENT_URL];
export const clientCors = cors({
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET'],
  credentials: true,
});
