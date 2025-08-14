# VAP Web Player

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](http://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D%2016-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)

一个基于React的VAP（Video Animation Player）Web播放器，支持透明视频动画播放和动态配置。

## 🎯 主要功能

- **透明视频播放**: 支持带透明通道的MP4视频播放
- **动态配置**: 通过URL参数或JSON配置文件动态设置播放参数
- **响应式设计**: 自动适配不同屏幕尺寸
- **事件监听**: 完整的播放事件回调支持
- **简洁界面**: 纯播放器模式，背景透明，适合嵌入使用

## 🚀 快速开始

### 在线体验

访问 [GitHub Pages 演示](https://username.github.io/vap-web-player) （请替换为实际的GitHub Pages地址）

### 本地运行

```bash
# 克隆项目
git clone https://github.com/username/vap-web-player.git
cd vap-web-player

# 安装依赖
npm install

# 启动开发服务器
npm start

# 浏览器访问 http://localhost:3000
```

## 📖 使用方法

### URL参数方式

在浏览器中访问以下格式的URL：

```
http://localhost:3000?src=your-video-url.mp4&config=config-url-or-json
```

**参数说明：**
- `src`: 必需，MP4视频文件的URL地址
- `config`: 可选，配置JSON的URL地址或JSON字符串

### 配置文件格式

```json
{
  "info": {
    "w": 375,
    "h": 375,
    "fps": 20
  }
}
```

**配置参数：**
- `w`: 视频宽度，默认375
- `h`: 视频高度，默认375  
- `fps`: 帧率，默认20

### 示例

```
# 基本使用
http://localhost:3000?src=https://example.com/video.mp4

# 带配置文件
http://localhost:3000?src=https://example.com/video.mp4&config=https://example.com/config.json

# 内联配置
http://localhost:3000?src=https://example.com/video.mp4&config={"info":{"w":500,"h":500,"fps":30}}
```

## 🛠️ 开发

### 项目结构

```
vap-web-player/
├── public/
│   └── index.html          # HTML模板
├── src/
│   ├── App.js              # 主应用组件
│   ├── index.js            # 应用入口
│   └── index.css           # 全局样式
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions部署配置
├── package.json            # 项目配置
└── README.md              # 项目说明
```

### 可用脚本

```bash
# 开发模式
npm start

# 构建生产版本
npm run build

# 运行测试
npm test

# 弹出配置（不可逆）
npm run eject
```

## 📦 构建和部署

### 本地构建

```bash
npm run build
```

构建文件将生成在 `build/` 目录中。

### GitHub Pages 自动部署

项目已配置GitHub Actions自动部署：

1. **更新配置**: 修改 `package.json` 中的 `homepage` 字段为你的GitHub Pages地址
2. **推送代码**: 推送到 `main` 分支会自动触发部署
3. **启用Pages**: 在GitHub仓库设置中启用GitHub Pages，选择 `gh-pages` 分支

详细部署说明请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 手动部署

```bash
# 构建项目
npm run build

# 将build目录内容部署到你的Web服务器
```

## 🔧 技术栈

- **React 18**: 用户界面框架
- **video-animation-player**: VAP核心播放库
- **GitHub Actions**: 自动化部署
- **GitHub Pages**: 静态网站托管

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证。

## 🙏 致谢

特别感谢 [Tencent VAP](https://github.com/Tencent/vap) 项目提供的优秀视频动画播放解决方案。VAP是企鹅电竞开发的融合礼物特效组件，为Web端透明视频播放提供了强大的技术支持。

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📞 支持

如果你在使用过程中遇到问题，请：

1. 查看 [Issues](https://github.com/username/vap-web-player/issues) 中是否有类似问题
2. 创建新的Issue描述你的问题
3. 提供详细的错误信息和复现步骤

---

**注意**: 请将README中的 `username` 替换为你的实际GitHub用户名。