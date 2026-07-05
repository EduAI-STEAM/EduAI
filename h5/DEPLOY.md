# GitHub Pages 部署与微信分享测试

## 第一步：修改 Open Graph 地址（必做）

部署前 Open Graph 地址已配置为：

```
https://eduai-steam.github.io/EduAI/h5/
```

（GitHub 会将用户名转为小写，这是正常行为。）

## 第二步：上传到 GitHub

```bash
cd /Users/amy/Desktop/Lesson_01_Cursor
git init
git add .
git commit -m "Add AI STEAM H5 with Open Graph"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

## 第三步：开启 GitHub Pages

1. 打开 GitHub 仓库 → **Settings** → **Pages**
2. Source 选 **Deploy from a branch**
3. Branch 选 **main**，文件夹选 **/ (root)**
4. 保存后等待 1–3 分钟

## 第四步：访问网站

```
https://你的用户名.github.io/你的仓库名/h5/
```

## 第五步：测试微信分享卡片

1. 确认分享图可访问：在浏览器打开  
   `https://你的用户名.github.io/你的仓库名/h5/images/share-cover.jpg`
2. 在微信聊天中粘贴 H5 链接，查看是否出现标题 + 描述 + 缩略图
3. 若卡片未更新，微信会缓存链接预览，可尝试：
   - 在链接后加随机参数，如 `?v=1`
   - 等待几小时后重试
   - 使用 [微信公众平台分享调试](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign)（需公众号）

## 当前已包含的图片

| 文件 | 用途 |
|------|------|
| `images/share-cover.jpg` | 微信分享封面（已生成占位图，可替换） |

## 可选：后续替换的图片

放入 `h5/images/` 后自动生效（文件名需与 `courses.js` 一致）：

- `logo.png` — 机构 Logo
- `hero-bg.jpg` — 首屏背景
- `ai-basics.jpg` / `steam-maker.jpg` / `ai-advanced.jpg` — 课程封面

图片缺失时页面会自动隐藏对应图片，不影响正常使用。

## 更短的网址（可选）

若希望地址为 `https://用户名.github.io/仓库名/`（不带 `/h5/`），可单独建仓库，只上传 `h5/` 文件夹内的文件到仓库根目录，并相应修改 OG 标签中的路径。
