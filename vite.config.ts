import path from "node:path";
import { PluginOption, defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

const tampermonkey = () => {
  const headers = `
// ==UserScript==
// @name         Floating Luogu
// @namespace    http://tampermonkey.net/
// @icon         https://cdn.luogu.com.cn/upload/usericon/3.png
// @author       yurzhang & tiger2005
// @homepage     https://github.com/Nikaidou-Shinku/Luogu-usercard
// @description  A plugin to decorate Luogu with exquisite user card.
// @include      https://www.luogu.com.cn/*
// @version      0.4.0
// @grant        none
// @license      MIT
// ==/UserScript==
  `.trim();

  return {
    name: "tampermonkey",
    apply: "build",
    enforce: "post",
    generateBundle: (_options, bundle) => {
      const [, target] = Object.entries(bundle).find(([name]) => name.includes("user.js")) ?? [];
      if (!target || target.type !== "chunk") return;
      target.code = `${headers}\n\n${target.code}`;
    },
  } as PluginOption;
};

export default defineConfig({
  plugins: [solidPlugin(), tampermonkey()],
  build: {
    target: "esnext",
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      name: "userscript",
      fileName: (format) => `flg.${format}.user.js`,
    },
  },
});
