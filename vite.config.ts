import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from 'path'
import styleImport from "vite-plugin-style-import";
import ViteComponents, { ElementPlusResolver } from "vite-plugin-components";
const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir)
}
// https://vitejs.dev/config/
export default defineConfig({
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
    proxy: {
      '^/list': {
        target: 'https://dev-gateway.iuctrip.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/list/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': pathResolve("src")
    }
  }
});
