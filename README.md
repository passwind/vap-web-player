# VAP Web Player

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](http://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D%2016-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)

[中文文档](./README_CN.md) | English

A React-based VAP (Video Animation Player) web player that supports transparent video animation playback with dynamic configuration.

## 🎯 Key Features

- **Transparent Video Playback**: Support for MP4 videos with alpha channel
- **Dynamic Configuration**: Configure playback parameters via URL parameters or JSON config files
- **Responsive Design**: Automatically adapts to different screen sizes
- **Event Handling**: Complete playback event callback support
- **Clean Interface**: Pure player mode with transparent background, perfect for embedding

## 🚀 Quick Start

### Online Demo

Visit [GitHub Pages Demo](https://username.github.io/vap-web-player) (replace with your actual GitHub Pages URL)

### Local Development

```bash
# Clone the repository
git clone https://github.com/username/vap-web-player.git
cd vap-web-player

# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000 in your browser
```

## 📖 Usage

### URL Parameters

Access the following URL format in your browser:

```
http://localhost:3000?src=your-video-url.mp4&config=config-url-or-json
```

**Parameters:**
- `src`: Required, URL of the MP4 video file
- `config`: Optional, URL of JSON config file or JSON string

### Configuration Format

```json
{
  "info": {
    "w": 375,
    "h": 375,
    "fps": 20
  }
}
```

**Configuration Parameters:**
- `w`: Video width, default 375
- `h`: Video height, default 375
- `fps`: Frame rate, default 20

### Examples

```
# Basic usage
http://localhost:3000?src=https://example.com/video.mp4

# With config file
http://localhost:3000?src=https://example.com/video.mp4&config=https://example.com/config.json

# Inline config
http://localhost:3000?src=https://example.com/video.mp4&config={"info":{"w":500,"h":500,"fps":30}}
```

## 🛠️ Development

### Project Structure

```
vap-web-player/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main application component
│   ├── index.js            # Application entry point
│   └── index.css           # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment config
├── package.json            # Project configuration
└── README.md              # Project documentation
```

### Available Scripts

```bash
# Development mode
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (irreversible)
npm run eject
```

## 📦 Build and Deployment

### Local Build

```bash
npm run build
```

Build files will be generated in the `build/` directory.

### GitHub Pages Auto Deployment

The project is configured with GitHub Actions for automatic deployment:

1. **Update Configuration**: Modify the `homepage` field in `package.json` to your GitHub Pages URL
2. **Push Code**: Pushing to the `main` branch will automatically trigger deployment
3. **Enable Pages**: Enable GitHub Pages in repository settings and select the `gh-pages` branch

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the build directory contents to your web server
```

## 🔧 Tech Stack

- **React 18**: User interface framework
- **video-animation-player**: VAP core playback library
- **GitHub Actions**: Automated deployment
- **GitHub Pages**: Static website hosting

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Special thanks to the [Tencent VAP](https://github.com/Tencent/vap) project for providing an excellent video animation playback solution. VAP is a fusion gift effect component developed by Penguin Esports, providing powerful technical support for transparent video playback on the web.

## 🤝 Contributing

Welcome to submit Issues and Pull Requests to improve this project!

## 📞 Support

If you encounter problems during use, please:

1. Check if there are similar issues in [Issues](https://github.com/username/vap-web-player/issues)
2. Create a new Issue describing your problem
3. Provide detailed error information and reproduction steps

---

**Note**: Please replace `username` in the README with your actual GitHub username. Thx