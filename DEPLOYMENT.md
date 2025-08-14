# GitHub Pages Deployment Guide

## Setup Instructions

### 1. Update package.json
Replace the `homepage` field in `package.json` with your actual GitHub repository URL:
```json
"homepage": "https://your-username.github.io/your-repository-name"
```

### 2. Enable GitHub Pages
1. Go to your GitHub repository
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **gh-pages** branch
5. Click **Save**

### 3. Repository Permissions
Ensure your repository has the following permissions:
- Go to **Settings** > **Actions** > **General**
- Under **Workflow permissions**, select **Read and write permissions**
- Check **Allow GitHub Actions to create and approve pull requests**

## Deployment Process

The GitHub Action will automatically:
1. Trigger on pushes to the `main` branch
2. Install Node.js dependencies
3. Build the React application
4. Deploy the built files to the `gh-pages` branch
5. Make the site available at your GitHub Pages URL

## Manual Deployment

If you need to deploy manually:
```bash
npm run build
# Then manually upload the build folder contents to gh-pages branch
```

## Troubleshooting

- Ensure the `homepage` field in `package.json` matches your GitHub Pages URL
- Check that GitHub Actions has proper permissions
- Verify that the `gh-pages` branch is selected as the source in repository settings
- Build errors will appear in the Actions tab of your repository