import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { redis } from "./redis.client";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});
