# AI Agent Instructions

This file contains instructions for AI assistants to help with common tasks.

## Git Commands

### Initial Setup
```bash
git init
git config user.email "21020671@vnu.edu.vn"
git config user.name "thanhtrung102"
```

### Committing Changes
After each major milestone, commit with descriptive messages:

```bash
git add .
git commit -m "Description of changes"
```

### Commit Message Guidelines
- Q1 Implementation: "feat: implement initial frontend and backend"
- Q2 Integration Tests: "test: add integration tests for client-server communication"
- Q3 Concurrently: "feat: add concurrent client/server execution"
- Q4 Syntax Highlighting: "feat: add Monaco Editor with syntax highlighting"
- Q5 Code Execution: "feat: add WASM-based code execution"
- Q6 Containerization: "feat: add Dockerfile for deployment"
- Q7 Deployment: "deploy: deploy to [service name]"

### Pushing to GitHub
```bash
# Add remote (only once)
git remote add origin https://github.com/thanhtrung102/coding-interview-platform.git

# Push changes
git branch -M main
git push -u origin main
```

## Development Workflow

### 1. Initial Implementation (Q1)
- Set up project structure
- Implement frontend with React + Vite
- Implement backend with Express + Socket.IO
- Test basic connectivity

### 2. Add Tests (Q2)
- Write integration tests with Jest
- Update README with test commands
- Ensure all tests pass

### 3. Configure Concurrently (Q3)
- Install concurrently in root package.json
- Add dev script to run both servers

### 4. Add Syntax Highlighting (Q4)
- Integrate Monaco Editor
- Configure language support

### 5. Add Code Execution (Q5)
- Implement Pyodide for Python
- Implement safe JavaScript execution

### 6. Containerize (Q6)
- Create Dockerfile
- Build and test Docker image
- Document Docker commands

### 7. Deploy (Q7)
- Choose deployment platform
- Configure deployment
- Test deployed application

## Common Commands

### Install Dependencies
```bash
# Root
npm install

# Client
cd client && npm install

# Server
cd server && npm install
```

### Run Development Servers
```bash
# Both together
npm run dev

# Client only
npm run client

# Server only
npm run server
```

### Run Tests
```bash
npm test
```

### Build for Production
```bash
npm run build
```

### Docker Commands
```bash
# Build
docker build -t coding-interview-platform .

# Run
docker run -p 3000:3000 -p 5000:5000 coding-interview-platform

# Run with docker-compose
docker-compose up
```

## Troubleshooting

### Port Already in Use
```bash
# Find process
lsof -i :3000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Clear Node Modules
```bash
rm -rf node_modules
rm -rf client/node_modules
rm -rf server/node_modules
npm install
```

### Clear Build Cache
```bash
rm -rf client/dist
rm -rf server/dist
npm run build
```

## AI Assistant Guidelines

When working on this project:

1. **Always read existing code before making changes**
2. **Commit after each question/milestone**
3. **Update ANSWERS.md with required information**
4. **Test thoroughly before moving to next question**
5. **Keep code clean and well-commented**
6. **Follow the project structure conventions**
7. **Update README.md with new features**

## Notes

- Use `python -m uv` for Python package management if available
- Prefer TypeScript for better type safety (optional)
- Use ESLint and Prettier for code formatting
- Keep dependencies minimal and up-to-date
