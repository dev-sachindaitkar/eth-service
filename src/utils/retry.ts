import { logger } from "../config/logger";

export async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 3000,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) {
      logger.error({ err }, "All retries failed");
      throw err;
    }

    logger.warn(
      `Retrying.. attempts left ${retries}, error ${(err as Error).message}`,
    );
    await new Promise((resolve) => {
      setTimeout(resolve, delayMs);
    });

    return retry(fn, retries - 1, delayMs);
  }
}
