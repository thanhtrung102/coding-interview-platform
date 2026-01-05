# Demo Video Script

**Duration**: 60-90 seconds
**Target**: LinkedIn, Twitter/X, YouTube

---

## Setup Before Recording

### Prerequisites:
- [ ] Application running locally OR deployed to production
- [ ] Two browser windows ready (Chrome/Firefox for testing)
- [ ] Screen recording software (OBS, Loom, or built-in)
- [ ] Microphone (optional but recommended)

### Code Samples to Demo:

**JavaScript Example:**
```javascript
// Fibonacci sequence
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

for (let i = 0; i < 10; i++) {
  console.log(`Fib(${i}) = ${fibonacci(i)}`);
}
```

**Python Example:**
```python
# Prime number checker
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

# Test with first 20 numbers
for num in range(20):
    if is_prime(num):
        print(f"{num} is prime")
```

---

## Script Timeline

### [0:00-0:10] Opening & Introduction (10 seconds)

**Visual**: Landing page at `localhost:3000` or `your-app.onrender.com`

**Narration** (optional):
> "I built a real-time collaborative coding interview platform using React, Socket.IO, and Claude Code AI assistance."

**Actions**:
- Show landing page
- Hover over "Create New Session" button

---

### [0:10-0:20] Create Session (10 seconds)

**Visual**: Click button, navigate to editor

**Narration** (optional):
> "Creating a new interview session generates a unique shareable link."

**Actions**:
1. Click "Create New Session"
2. Show session URL in address bar
3. Highlight the session ID

---

### [0:20-0:35] Demonstrate Multi-User Collaboration (15 seconds)

**Visual**: Split screen showing two browser windows

**Narration** (optional):
> "Multiple users can join the same session and edit code in real-time."

**Actions**:
1. Copy session link
2. Open in second browser window (incognito)
3. Show participant counter changing (1 → 2)
4. Type in Window 1, show it appearing instantly in Window 2
5. Type in Window 2, show it appearing instantly in Window 1

**Tip**: Use split-screen or picture-in-picture to show both windows simultaneously

---

### [0:35-0:50] Code Execution - JavaScript (15 seconds)

**Visual**: Focus on primary window

**Narration** (optional):
> "The platform supports in-browser code execution for JavaScript..."

**Actions**:
1. Ensure language is set to "JavaScript"
2. Paste the Fibonacci code (or type it fast)
3. Click "Run Code" button
4. Show output appearing in real-time
5. Highlight the results

---

### [0:50-1:05] Code Execution - Python (15 seconds)

**Visual**: Same window

**Narration** (optional):
> "...and Python using WebAssembly, with no backend required."

**Actions**:
1. Click language selector
2. Change to "Python"
3. Show "Loading Python runtime..." message
4. Wait for "Python ready!" message
5. Paste the prime number code (or type it)
6. Click "Run Code"
7. Show Python output

---

### [1:05-1:20] Feature Highlights (15 seconds)

**Visual**: Quick montage or bullet points overlay

**Narration** (optional):
> "Features include Monaco Editor with syntax highlighting, real-time synchronization, and secure WASM execution—all built in collaboration with Claude Code."

**Actions**:
- Show syntax highlighting (zoom in on colored code)
- Demonstrate language selector dropdown
- Show participant counter
- Show "Copy Link" button
- Quick pan across the UI

---

### [1:20-1:30] Closing & Call to Action (10 seconds)

**Visual**: Landing page or GitHub repository

**Narration** (optional):
> "Check out the full project on GitHub. Built with React, Express, Socket.IO, and Monaco Editor."

**Actions**:
- Show GitHub URL: `github.com/thanhtrung102/coding-interview-platform`
- Optional: Show tech stack or architecture diagram
- End screen with:
  - GitHub link
  - Your LinkedIn profile
  - "Built with Claude Code" badge

---

## Recording Tips

### Visual Quality:
- **Resolution**: 1080p minimum (1920x1080)
- **Frame rate**: 30 fps or 60 fps
- **Zoom**: Increase browser zoom to 125-150% for visibility
- **Hide bookmarks**: Use clean browser profile
- **Dark mode**: Better for screen recording

### Audio (if narrating):
- Use quiet room
- Test microphone levels
- Speak clearly and slowly
- Practice script 2-3 times before recording

### Editing:
- Add background music (royalty-free)
- Increase typing speed in post (2x)
- Add text overlays for key features
- Include captions/subtitles
- Add transition effects between sections

### Recording Tools:

**Free Options:**
- **OBS Studio** (Windows/Mac/Linux) - Full control
- **Loom** (Web) - Easy sharing, auto-uploads
- **Windows Game Bar** (Win+G) - Built-in Windows
- **QuickTime** (Mac) - Built-in macOS
- **ShareX** (Windows) - Lightweight

**Paid Options:**
- **Camtasia** - Professional editing
- **ScreenFlow** (Mac) - Professional editing
- **Snagit** - Simple and effective

---

## Social Media Posting Guide

### LinkedIn Post Template:

```
🚀 Just built a real-time collaborative coding interview platform!

Built with AI assistance from Claude Code, this platform enables:
✅ Real-time multi-user code collaboration
✅ In-browser JavaScript & Python execution (WASM)
✅ Monaco Editor with syntax highlighting
✅ Shareable session links
✅ WebSocket synchronization

Tech Stack:
• Frontend: React + Vite + Monaco Editor
• Backend: Express.js + Socket.IO
• Deployment: Docker + Render

This was part of my end-to-end application development assignment, completed with comprehensive integration tests, Docker containerization, and production deployment.

Check it out on GitHub: [link]

#WebDev #React #NodeJS #RealTime #CodeInterview #AI #ClaudeCode

[Video Demo]
```

### Twitter/X Post Template:

```
🔥 Built a real-time collaborative coding platform with @AnthropicAI Claude Code

Features:
• Multi-user real-time editing
• JS/Python execution in browser
• Monaco Editor integration
• WebSocket sync

Stack: React + Express + Socket.IO + WASM

Demo 👇

[Video]

github.com/thanhtrung102/coding-interview-platform
```

### YouTube Description Template:

```
Real-Time Collaborative Coding Interview Platform

I built this full-stack platform as part of my end-to-end application development course, with assistance from Claude Code.

🎯 FEATURES:
• Create shareable session links
• Real-time multi-user collaboration
• Monaco Editor (VS Code's editor)
• Execute JavaScript in browser
• Execute Python via WebAssembly (Pyodide)
• Live participant counter
• Syntax highlighting for 100+ languages

💻 TECH STACK:
Frontend:
- React 18
- Vite 5
- Monaco Editor
- Socket.IO Client
- Tailwind CSS

Backend:
- Node.js 18
- Express.js
- Socket.IO
- UUID for sessions

Testing:
- Jest
- Supertest
- Integration tests

DevOps:
- Docker multi-stage builds
- Deployed on Render
- CI/CD with GitHub

🔗 LINKS:
GitHub: https://github.com/thanhtrung102/coding-interview-platform
Live Demo: [your-render-url]

📚 DOCUMENTATION:
Full implementation details, test coverage, and deployment guide available in the repository.

⏱️ TIMESTAMPS:
0:00 Introduction
0:10 Create Session
0:20 Multi-User Collaboration
0:35 JavaScript Execution
0:50 Python Execution
1:05 Feature Highlights
1:20 Closing

Built with Claude Code AI assistance.

#coding #webdev #react #nodejs #realtime #interview
```

---

## Hashtag Recommendations

### LinkedIn:
- #WebDevelopment #FullStack #React #NodeJS
- #RealTime #WebSocket #CodeInterview
- #SoftwareEngineering #Programming
- #AI #ClaudeCode #Anthropic
- #DevOps #Docker #WASM

### Twitter/X:
- #WebDev #ReactJS #NodeJS #100DaysOfCode
- #RealTime #CodeInterview #BuildInPublic
- #AI #ClaudeCode #WASM

### YouTube:
- coding, programming, web development
- react tutorial, nodejs project
- real-time collaboration, websocket
- code interview platform

---

## Alternative Demo Formats

### 1. Silent Demo with Text Overlays
- No narration needed
- Add text cards explaining each section
- Background music only
- Good for international audience

### 2. Sped-Up Coding Montage
- Show the actual building process
- Fast-forward through coding
- Time-lapse style
- Great for "build with me" content

### 3. Split-Screen Tutorial
- Left: Code editor
- Right: Running application
- Show cause and effect immediately
- More educational approach

### 4. Before/After Comparison
- Show problem statement first
- Then demonstrate solution
- Highlight pain points solved
- More narrative-driven

---

## Post-Recording Checklist

- [ ] Video is 60-90 seconds long
- [ ] All features demonstrated clearly
- [ ] Audio is clear (if included)
- [ ] Links are visible and correct
- [ ] No sensitive information shown
- [ ] Smooth transitions between scenes
- [ ] Exported in high quality (1080p+)
- [ ] Tested playback on mobile
- [ ] Added to LinkedIn/Twitter/YouTube
- [ ] Tagged relevant hashtags
- [ ] Shared in relevant communities

---

## Bonus: GIF Version

For quick social media sharing, create a 10-15 second GIF:

**Tools:**
- ScreenToGif (Windows)
- LICEcap (Mac/Windows)
- Gifox (Mac)

**Content:**
1. Create session (3s)
2. Two users typing simultaneously (5s)
3. Code execution result (3s)

**Use for:**
- Twitter/X embedded media
- GitHub README
- Portfolio website
- Quick previews

---

**Good luck with your demo! 🎥🚀**
