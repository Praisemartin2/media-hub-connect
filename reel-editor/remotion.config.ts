/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);

// This environment's network policy blocks Remotion's Chrome Headless Shell
// download (remotion.media is not allowlisted). Point Remotion at the
// pre-installed Playwright headless_shell binary instead. Override with the
// REMOTION_BROWSER_EXECUTABLE env var if the path differs.
const browserExecutable =
  process.env.REMOTION_BROWSER_EXECUTABLE ??
  "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
Config.setBrowserExecutable(browserExecutable);
