import app from "../app/app";

import { PORT } from "../config/env";
import { logger } from "../config/logger";
import { setupGracefulShutdown } from "./shutdown";

let server: any;

if (require.main === module) {
  setupGracefulShutdown();
  server = app.listen(PORT, () => {
    logger.info("ETH service running on port:" + PORT);
  });
}

export { server };
export default app;
