import connectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';

const RedisStore = connectRedis(session);

const redisClient = new Redis();

export const sessionStore = new RedisStore({
  client: redisClient,
});
