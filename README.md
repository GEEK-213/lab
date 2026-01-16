# 🌱 EcoSolutions - AI-Powered Sustainability Audit Tool

A modern web application that helps businesses assess their environmental impact and get AI-powered recommendations for improving sustainability.

## ✨ Features

- 🤖 **AI-Powered Analysis** - Get instant sustainability scores using Google Gemini AI
- 📊 **Comprehensive Metrics** - Track paper usage, cloud spending, remote work percentage, and more
- 🎯 **Actionable Recommendations** - Receive personalized suggestions to improve your eco-friendliness
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🌙 **Dark Mode** - Comfortable viewing in any lighting condition

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd lab
   ```

2. **Set up the backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env and add your GEMINI_KEY
   npm start
   ```

3. **Set up the frontend** (in a new terminal)

   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## 📁 Project Structure

```
lab/
├── backend/           # Express.js API server
│   ├── server.js     # Main server file
│   └── package.json
├── client/           # React + Vite frontend
│   ├── src/
│   │   ├── components/  # React components
│   └── package.json
└── README.md
```

## 🔧 Environment Variables

### Backend (.env)

```env
PORT=3001
GEMINI_KEY=your_gemini_api_key_here
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3001
```

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend

- **Express.js** - Web framework
- **Google Gemini AI** - AI analysis
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 📝 Usage

1. **Start the audit** - Click "Start Free Audit" on the landing page
2. **Fill in your metrics**:
   - Business description
   - Paper usage (reams)
   - Cloud spending ($)
   - Remote work percentage (%)
   - Disposable items cost ($)
   - Electricity usage (kWh)
   - Waste volume (kg)
3. **Get your score** - Receive an AI-powered sustainability score (0-100)
4. **Review recommendations** - See personalized suggestions for improvement

### How AI was used

1. **For Frontend** - used sitch for website designs and took images to gemini to convert to code, along the way used chatgpt to bad ui code generated then lastly manually edited it.
2. **For Backend** - used chatgpt to write the code logic and gemini ai to set up the api key logic working with axios.

### Upcoming Features

- ✅ User authentication
- ✅ Audit history
- ✅ Export reports (PDF)
- ✅ Industry benchmarking
- ✅ Carbon footprint calculator
- ✅ Progress tracking over time

**Made with 🌱 for a sustainable future**
