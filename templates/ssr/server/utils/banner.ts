const BannerChalk = require("chalk");
const { successBox: successFormate } = require("./formatting");
const { getFormattedMemoryUsage: getUsage } = require("./memory");

interface BannerOption {
  messages?: string[];
  bannerColor?: string;
  name?: string;
  version?: string;
  rendering?: string;
  target?: string;
  host: string;
  port: string;
}

function showBanner(
  isProd: Boolean,
  options?: BannerOption,
  showMemoryUsage = true
) {
  const opt = Object.assign(
    {
      messages: [],
      bannerColor: "green",
      name: process.env.npm_package_name || "vue3-ssr",
      version: process.env.npm_package_version || "exotic",
      rendering: "unknown",
      target: "server" + (isProd ? "" : " (Vite)"),
      host: "unknown",
      port: "unknown",
    },
    options
  );
  const titleLines = [];
  const messageLines = [];

  // Name and version
  titleLines.push(
    // @ts-ignore
    `${BannerChalk[opt.bannerColor].bold(opt.name)} @ v${opt.version}\n`
  );

  const label = (name: string) => BannerChalk.bold.cyan(`▸ ${name}:`);

  // Environment
  titleLines.push(`${label("Node")}        v${process.versions.node}`);
  titleLines.push(`${label("Environment")} ${process.env.NODE_ENV}`);

  // Rendering
  titleLines.push(`${label("Rendering")}   ${opt.rendering}`);

  // Target
  titleLines.push(`${label("Target")}      ${opt.target}`);

  if (showMemoryUsage) {
    titleLines.push("\n" + getUsage());
  }

  // Listeners
  messageLines.push(
    BannerChalk.bold(`${BannerChalk.green("△")} Listening: `) +
      BannerChalk.underline.blue(
        `http://${opt.host}:${
          opt.port
        }`
      )
  );

  // Add custom messages
  if (opt.messages.length) {
    messageLines.push("", ...opt.messages);
  }

  process.stdout.write(
    successFormate(messageLines.join("\n"), titleLines.join("\n"))
  );
}

module.exports = {
  showBanner,
};
