import type { NextApiRequest, NextApiResponse } from 'next';

interface RateLimitConfig {
  interval: number;
  uniqueTokenPerInterval: number;
}

interface TokenBucket {
  count: number;
  lastReset: number;
}

// NOTE: This in-memory rate limiter works for single-instance deployments.
// For serverless/distributed environments (e.g., Vercel), use a shared store
// such as Redis or Vercel KV for effective rate limiting across instances.
const tokenBuckets = new Map<string, TokenBucket>();

export function rateLimit(config: RateLimitConfig) {
  const { interval, uniqueTokenPerInterval } = config;

  return {
    check: (req: NextApiRequest, limit: number): Promise<void> => {
      return new Promise((resolve, reject) => {
        const ip =
          (Array.isArray(req.headers['x-forwarded-for'])
            ? req.headers['x-forwarded-for'][0]
            : req.headers['x-forwarded-for']) ||
          req.socket?.remoteAddress ||
          'unknown';

        const now = Date.now();
        const bucket = tokenBuckets.get(ip);

        if (!bucket || now - bucket.lastReset > interval) {
          tokenBuckets.set(ip, { count: 1, lastReset: now });
          resolve();
          return;
        }

        if (bucket.count >= limit) {
          reject(new Error('Rate limit exceeded'));
          return;
        }

        bucket.count++;
        resolve();

        // Cleanup old entries periodically
        if (tokenBuckets.size > uniqueTokenPerInterval) {
          const entries = Array.from(tokenBuckets.entries());
          for (const [key, value] of entries) {
            if (now - value.lastReset > interval) {
              tokenBuckets.delete(key);
            }
          }
        }
      });
    },
  };
}

export const apiLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});
