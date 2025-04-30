# Real-Time Chat Application

## 📝 Table of Contents
1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [Installation](#-installation)

## ✨ Features
- **Real-time messaging** using WebSockets
- **Multiple chat rooms** support
- **Message history** persistence
- **User presence** indicators
- **Responsive design** for all devices

## 🛠️ Tech Stack
| Component | Technology |
|-----------|------------|
| Frontend  | React 18 + Vite |
| State     | Context API |
| Styling   | CSS |
| Backend   | Node.js + Express |
| Real-time | Socket.IO |
| Database  | MongoDB (Mongoose) |

## 🚀 Installation
```bash
# Clone repository
git clone https://github.com/yourusername/chat-app.git
cd chat-app

# Backend setup
cd server
npm install
cp .env.example .env
npm run dev

# Frontend setup (in new terminal)
cd ../client
npm install
cp .env.example .env
npm run dev
