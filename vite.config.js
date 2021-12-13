import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

import { resolve  } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // base: path.resolve(__dirname, './dist/'),
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: [{find: '@', replacement:resolve(__dirname, 'src')}],
    // 不建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
    extensions: ['vue', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  define: {
    'process.env': {}
  }
})
