# 🌱 EcoSmart - AI-Powered Sustainability Audit Tool

A modern web application that helps businesses assess their environmental impact and get AI-powered recommendations for improving sustainability.

## ✨ Features

- 🤖 **AI-Powered Analysis** - Get instant sustainability scores using Google Gemini AI
- 📊 **Comprehensive Metrics** - Track paper usage, cloud spending, remote work percentage, and more
- 🎯 **Actionable Recommendations** - Receive personalized suggestions to improve your eco-friendliness
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🌙 **Dark Mode** - Comfortable viewing in any lighting condition
- 💾 **Auto-Save** - Form data is automatically saved as you type

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
│   │   ├── services/     # API service layer
│   │   ├── hooks/        # Custom React hooks
│   │   └── utils/        # Utility functions
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

## 🎯 Roadmap

See [IMPROVEMENT_PLAN.md](./IMPROVEMENT_PLAN.md) for detailed improvement plans and [ROADMAP.md](./ROADMAP.md) for the development timeline.

### Upcoming Features
- ✅ User authentication
- ✅ Audit history
- ✅ Export reports (PDF)
- ✅ Industry benchmarking
- ✅ Carbon footprint calculator
- ✅ Progress tracking over time

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Google Gemini AI for powering the sustainability analysis
- Tailwind CSS for the beautiful design system
- React team for the amazing framework

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with 🌱 for a sustainable future**
