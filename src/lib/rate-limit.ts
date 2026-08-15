import "server-only";

/**
 * In-memory sliding-window rate limiter. Sufficient for a single-instance
 * deployment; for multi-instance production, move the store to a shared
 * cache (e.g. Redis). Never reveal whether a key "exists" to callers — the
 * limiter returns a boolean only.
 */

interface Bucket {
  hits: number[];
  windowStart: number;
}

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000;
const CLEANUP_EVERY = 1_000;

let checks = 0;

function prune(key: string, bucket: Bucket, now: number): void {
  bucket.hits = bucket.hits.filter((t) => now - t < WINDOW_MS);
  if (bucket.hits.length === 0) {
    buckets.delete(key);
  }
}

export function rateLimit(
  key: string,
  limit = 30,
  windowMs = WINDOW_MS,
): boolean {
  const now = Date.now();
  let bucket = buckets.get(key);

  if (!bucket) {
    bucket = { hits: [], windowStart: now };
    buckets.set(key, bucket);
  }

  prune(key, bucket, now);
  if (bucket.hits.length >= limit) {
    return false;
  }

  bucket.hits.push(now);

  checks += 1;
  if (checks >= CLEANUP_EVERY) {
    checks = 0;
    const cutoff = now - windowMs;
    for (const [k, b] of buckets) {
      b.hits = b.hits.filter((t) => t >= cutoff);
      if (b.hits.length === 0) buckets.delete(k);
    }
  }

  return true;
}

export function withBackoff(
  key: string,
  limit = 30,
  windowMs = WINDOW_MS,
): boolean {
  return rateLimit(`backoff:${key}`, limit, windowMs);
}

export const LIMITS = {
  ENQUIRY: 5,
  CONTACT: 5,
  SEARCH: 60,
  WISHLIST: 120,
} as const;
