import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'DeepBlog',
  description: 'Blog with DeepSeek',
  bundler: viteBundler(),
  theme: defaultTheme(),
})