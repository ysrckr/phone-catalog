import cors from 'cors';

export const adminCors = cors({
  origin: process.env.ADMIN_URL,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
});

export const clientCors = cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET'],
  credentials: true,
});
