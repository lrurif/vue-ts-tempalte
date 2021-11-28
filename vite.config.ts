import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import styleImport from "vite-plugin-style-import";
import ViteComponents, { ElementPlusResolver } from "vite-plugin-components";
const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir);
};
// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue(),
      ViteComponents({
        customComponentResolvers: [ElementPlusResolver()],
      }),
      //按需导入element-plus的css样式
      styleImport({
        libs: [
          {
            libraryName: "element-plus",
            esModule: true,
            resolveStyle: (name) => {
              return `element-plus/lib/theme-chalk/${name}.css`;
            },
          },
        ],
      }),
    ],
    server: {
      open: true,
      host: '0.0.0.0',
      port: 8090,
      proxy: {
        "^/list": {
          target: "https://dev-gateway.iuctrip.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/list/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": pathResolve("src"),
      },
    },
    // 防止清屏
    clearScreen: false,
    build: {
      // 通过loadEnv来获取不同环境的输出路径，因为此文件中不能直接获取import.meta.env
      outDir: pathResolve(`./dist/${loadEnv(mode, process.cwd()).VITE_ENV}`),
    },
  });
};
