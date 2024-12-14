// vite.config.js
import { fileURLToPath, URL } from "node:url";
import process from "node:process";
import { defineConfig, loadEnv } from "file:///C:/Users/%E9%99%B3%E4%BD%B3%E6%B2%9B/Documents/vue3_2025/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/%E9%99%B3%E4%BD%B3%E6%B2%9B/Documents/vue3_2025/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Icons from "file:///C:/Users/%E9%99%B3%E4%BD%B3%E6%B2%9B/Documents/vue3_2025/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///C:/Users/%E9%99%B3%E4%BD%B3%E6%B2%9B/Documents/vue3_2025/node_modules/unplugin-icons/dist/resolver.js";
import { createSvgIconsPlugin } from "file:///C:/Users/%E9%99%B3%E4%BD%B3%E6%B2%9B/Documents/vue3_2025/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import Components from "file:///C:/Users/%E9%99%B3%E4%BD%B3%E6%B2%9B/Documents/vue3_2025/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///C:/Users/%E9%99%B3%E4%BD%B3%E6%B2%9B/Documents/vue3_2025/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/%E9%99%B3%E4%BD%B3%E6%B2%9B/Documents/vue3_2025/vite.config.js";
function styleOrderPlugin() {
  const styleOrder = [];
  return {
    name: "style-order",
    enforce: "post",
    apply: "build",
    renderChunk(_, chunk) {
      if (chunk.viteMetadata?.importedCss) {
        chunk.viteMetadata.importedCss.forEach((css) => {
          if (!styleOrder.includes(css)) {
            if (css.includes("element-plus")) {
              styleOrder.push(css);
            } else {
              styleOrder.unshift(css);
            }
          }
        });
      }
      return null;
    },
    transformIndexHtml(html) {
      const cssLinks = html.match(/<link[^>]*rel="stylesheet"[^>]*>/g) || [];
      const sortedLinks = cssLinks.sort((a, b) => {
        const aIndex = styleOrder.findIndex((s) => a.includes(s));
        const bIndex = styleOrder.findIndex((s) => b.includes(s));
        return aIndex - bIndex;
      });
      const newHtml = html.replace(/<link[^>]*rel="stylesheet"[^>]*>/g, "");
      return newHtml.replace(
        /(<link[^>]*modulepreload[^>]*>)\s*(?=<\/head>)/,
        `$1
    ${sortedLinks.join("\n    ")}
  `
      );
    }
  };
}
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: process.env.NODE_ENV === "production" ? "/vue3_2025/" : "./",
    plugins: [
      vue(),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: "icon",
            // 自定義icon前綴
            enabledCollections: ["ep"]
            // 使用 Element Plus icon set
          })
        ]
      }),
      styleOrderPlugin(),
      createSvgIconsPlugin({
        // 指定需要緩存的圖標文件夾
        iconDirs: [fileURLToPath(new URL("./src/assets/img/icons", __vite_injected_original_import_meta_url))],
        // 指定symbolId格式
        symbolId: "icon-[name]"
      }),
      Icons({
        autoInstall: true
        // 如果未安裝會自動安裝icon library
      })
      // vueDevTools(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
        "@/types": fileURLToPath(new URL("./src/types", __vite_injected_original_import_meta_url)),
        "@/styles": fileURLToPath(new URL("./src/styles", __vite_injected_original_import_meta_url)),
        "@/assets": fileURLToPath(new URL("./src/assets", __vite_injected_original_import_meta_url)),
        "@/composables": fileURLToPath(new URL("./src/composables", __vite_injected_original_import_meta_url)),
        "@/components": fileURLToPath(new URL("./src/components", __vite_injected_original_import_meta_url)),
        "@/utils": fileURLToPath(new URL("./src/utils", __vite_injected_original_import_meta_url)),
        "@/plugin": fileURLToPath(new URL("./src/plugin", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      port: 3e3,
      proxy: {
        "/api": {
          target: env.VITE_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.toString().split("node_modules/")[1].split("/")[0].includes("element-plus")) {
                return "element-plus";
              } else {
                return "vendor";
              }
            }
          },
          chunkFileNames: "js/[name].[hash].js",
          entryFileNames: "js/[name].[hash].js",
          assetFileNames: (assetInfo) => {
            const asset = assetInfo;
            const info = asset.name.split(".");
            const extType = info[info.length - 1];
            if (/png|jpe?g|gif|svg|webp|ico/i.test(extType)) {
              return `img/[name]-[hash][extname]`;
            }
            if (/css/i.test(extType)) {
              return `css/[name]-[hash][extname]`;
            }
            if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
              return `fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          }
        }
      },
      minify: "esbuild"
      // 使用 esbuild 壓縮
    },
    esbuild: {
      //drop: ['console', 'debugger'],  // 移除 console 和 debugger
    },
    css: {
      devSourcemap: true
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTk2NzNcdTRGNzNcdTZDOUJcXFxcRG9jdW1lbnRzXFxcXHZ1ZTNfMjAyNVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHU5NjczXHU0RjczXHU2QzlCXFxcXERvY3VtZW50c1xcXFx2dWUzXzIwMjVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVFOSU5OSVCMyVFNCVCRCVCMyVFNiVCMiU5Qi9Eb2N1bWVudHMvdnVlM18yMDI1L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xyXG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcidcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcbi8vIGltcG9ydCB0eXBlIHsgT3V0cHV0QnVuZGxlIH0gZnJvbSAncm9sbHVwJztcclxuXHJcbi8vIFx1NTI3NVx1NUVGQVx1NEUwMFx1NTAwQlx1NjNEMlx1NEVGNlx1NEY4Nlx1NjNBN1x1NTIzNiBDU1MgXHU5ODA2XHU1RThGXHJcbmZ1bmN0aW9uIHN0eWxlT3JkZXJQbHVnaW4oKSB7XHJcbiAgY29uc3Qgc3R5bGVPcmRlciA9IFtdXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnc3R5bGUtb3JkZXInLFxyXG4gICAgZW5mb3JjZTogJ3Bvc3QnLFxyXG4gICAgYXBwbHk6ICdidWlsZCcsXHJcblxyXG4gICAgcmVuZGVyQ2h1bmsoXywgY2h1bmspIHtcclxuICAgICAgaWYgKGNodW5rLnZpdGVNZXRhZGF0YT8uaW1wb3J0ZWRDc3MpIHtcclxuICAgICAgICBjaHVuay52aXRlTWV0YWRhdGEuaW1wb3J0ZWRDc3MuZm9yRWFjaChjc3MgPT4ge1xyXG4gICAgICAgICAgaWYgKCFzdHlsZU9yZGVyLmluY2x1ZGVzKGNzcykpIHtcclxuICAgICAgICAgICAgaWYgKGNzcy5pbmNsdWRlcygnZWxlbWVudC1wbHVzJykpIHtcclxuICAgICAgICAgICAgICBzdHlsZU9yZGVyLnB1c2goY3NzKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN0eWxlT3JkZXIudW5zaGlmdChjc3MpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9LFxyXG5cclxuICAgIHRyYW5zZm9ybUluZGV4SHRtbChodG1sKSB7XHJcbiAgICAgIGNvbnN0IGNzc0xpbmtzID0gaHRtbC5tYXRjaCgvPGxpbmtbXj5dKnJlbD1cInN0eWxlc2hlZXRcIltePl0qPi9nKSB8fCBbXVxyXG5cclxuICAgICAgY29uc3Qgc29ydGVkTGlua3MgPSBjc3NMaW5rcy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYUluZGV4ID0gc3R5bGVPcmRlci5maW5kSW5kZXgocyA9PiBhLmluY2x1ZGVzKHMpKVxyXG4gICAgICAgIGNvbnN0IGJJbmRleCA9IHN0eWxlT3JkZXIuZmluZEluZGV4KHMgPT4gYi5pbmNsdWRlcyhzKSlcclxuICAgICAgICByZXR1cm4gYUluZGV4IC0gYkluZGV4XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAvLyBcdTc5RkJcdTk2NjRcdTUzOUZcdTY3MDlcdTc2ODQgQ1NTIFx1OTAyM1x1N0Q1MFxyXG4gICAgICBjb25zdCBuZXdIdG1sID0gaHRtbC5yZXBsYWNlKC88bGlua1tePl0qcmVsPVwic3R5bGVzaGVldFwiW14+XSo+L2csICcnKVxyXG5cclxuICAgICAgLy8gXHU0RkVFXHU2NTM5XHU2M0QyXHU1MTY1XHU2NUI5XHU1RjBGXHVGRjBDXHU3OEJBXHU0RkREXHU2QjYzXHU3OEJBXHU3Njg0XHU2M0RCXHU4ODRDXHU1NDhDXHU3RTJFXHU2MzkyXHJcbiAgICAgIHJldHVybiBuZXdIdG1sLnJlcGxhY2UoXHJcbiAgICAgICAgLyg8bGlua1tePl0qbW9kdWxlcHJlbG9hZFtePl0qPilcXHMqKD89PFxcL2hlYWQ+KS8sXHJcbiAgICAgICAgYCQxXFxuICAgICR7c29ydGVkTGlua3Muam9pbignXFxuICAgICcpfVxcbiAgYFxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJylcclxuICByZXR1cm4ge1xyXG4gICAgYmFzZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/ICcvdnVlM18yMDI1LycgOiAnLi8nLFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXHJcbiAgICAgICAgICBJY29uc1Jlc29sdmVyKHtcclxuICAgICAgICAgICAgcHJlZml4OiAnaWNvbicsIC8vIFx1ODFFQVx1NUI5QVx1N0ZBOWljb25cdTUyNERcdTdEQjRcclxuICAgICAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbJ2VwJ10sIC8vIFx1NEY3Rlx1NzUyOCBFbGVtZW50IFBsdXMgaWNvbiBzZXRcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBzdHlsZU9yZGVyUGx1Z2luKCksXHJcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdTdERTlcdTVCNThcdTc2ODRcdTU3MTZcdTZBMTlcdTY1ODdcdTRFRjZcdTU5M0VcclxuICAgICAgICBpY29uRGlyczogW2ZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvYXNzZXRzL2ltZy9pY29ucycsIGltcG9ydC5tZXRhLnVybCkpXSxcclxuICAgICAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxyXG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bbmFtZV0nLFxyXG4gICAgICB9KSxcclxuICAgICAgSWNvbnMoe1xyXG4gICAgICAgIGF1dG9JbnN0YWxsOiB0cnVlLCAvLyBcdTU5ODJcdTY3OUNcdTY3MkFcdTVCODlcdTg4RERcdTY3MDNcdTgxRUFcdTUyRDVcdTVCODlcdTg4RERpY29uIGxpYnJhcnlcclxuICAgICAgfSksXHJcbiAgICAgIC8vIHZ1ZURldlRvb2xzKCksXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgICdAL3R5cGVzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy90eXBlcycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgICdAL3N0eWxlcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvc3R5bGVzJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICAgJ0AvYXNzZXRzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9hc3NldHMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgICAnQC9jb21wb3NhYmxlcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvY29tcG9zYWJsZXMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgICAnQC9jb21wb25lbnRzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9jb21wb25lbnRzJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICAgJ0AvdXRpbHMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL3V0aWxzJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICAgJ0AvcGx1Z2luJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9wbHVnaW4nLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0OiAzMDAwLFxyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgICcvYXBpJzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9CQVNFX0FQSSxcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcclxuICAgICAgICB9LFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgICBpZiAoaWQudG9TdHJpbmcoKS5zcGxpdCgnbm9kZV9tb2R1bGVzLycpWzFdLnNwbGl0KCcvJylbMF0uaW5jbHVkZXMoJ2VsZW1lbnQtcGx1cycpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2VsZW1lbnQtcGx1cydcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwianMvW25hbWVdLltoYXNoXS5qc1wiLFxyXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwianMvW25hbWVdLltoYXNoXS5qc1wiLFxyXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYXNzZXQgPSBhc3NldEluZm9cclxuICAgICAgICAgICAgY29uc3QgaW5mbyA9IGFzc2V0Lm5hbWUuc3BsaXQoJy4nKVxyXG4gICAgICAgICAgICBjb25zdCBleHRUeXBlID0gaW5mb1tpbmZvLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgICAgIGlmICgvcG5nfGpwZT9nfGdpZnxzdmd8d2VicHxpY28vaS50ZXN0KGV4dFR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGBpbWcvW25hbWVdLVtoYXNoXVtleHRuYW1lXWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoL2Nzcy9pLnRlc3QoZXh0VHlwZSkpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gYGNzcy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdYFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgvd29mZnx3b2ZmMnxlb3R8dHRmfG90Zi9pLnRlc3QoZXh0VHlwZSkpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gYGZvbnRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGBhc3NldHMvW25hbWVdLVtoYXNoXVtleHRuYW1lXWBcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtaW5pZnk6ICdlc2J1aWxkJywgIC8vIFx1NEY3Rlx1NzUyOCBlc2J1aWxkIFx1NThEM1x1N0UyRVxyXG4gICAgfSxcclxuICAgIGVzYnVpbGQ6IHtcclxuICAgICAgLy9kcm9wOiBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSwgIC8vIFx1NzlGQlx1OTY2NCBjb25zb2xlIFx1NTQ4QyBkZWJ1Z2dlclxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICBkZXZTb3VyY2VtYXA6IHRydWUsXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1QsU0FBUyxlQUFlLFdBQVc7QUFDdlYsT0FBTyxhQUFhO0FBQ3BCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFSNkksSUFBTSwyQ0FBMkM7QUFZbE8sU0FBUyxtQkFBbUI7QUFDMUIsUUFBTSxhQUFhLENBQUM7QUFFcEIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLElBRVAsWUFBWSxHQUFHLE9BQU87QUFDcEIsVUFBSSxNQUFNLGNBQWMsYUFBYTtBQUNuQyxjQUFNLGFBQWEsWUFBWSxRQUFRLFNBQU87QUFDNUMsY0FBSSxDQUFDLFdBQVcsU0FBUyxHQUFHLEdBQUc7QUFDN0IsZ0JBQUks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
