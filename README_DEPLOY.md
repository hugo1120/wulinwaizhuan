# 武林外传电子相册 (Github 部署版)

本文件夹包含了纯净的前端代码，可以直接推送至 GitHub 并连接 Cloudflare Pages。

## 目录结构
- `src/`: 源代码
- `public/`: 静态资源（包含生成的 `data.json` 索引）
- `vite.config.js`: 构建配置

## 部署步骤
1. 将本文件夹初始化为 Git 仓库：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. 推送到您的 GitHub。
3. 在 Cloudflare Pages 后台连接该仓库。
4. 构建命令：`npm run build`
5. 输出目录：`dist`

**注意**：不需要上传 `keyframes` 文件夹，图片已配置为从 R2 读取。
