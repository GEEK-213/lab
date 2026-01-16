# 🛠️ Implementation Guide - Next Steps

This guide provides step-by-step instructions for implementing the improvements outlined in the improvement plan.

## 🎯 Phase 1: Quick Wins (Start Here!)

### Step 1: Install Dependencies

```bash
cd client
npm install react-hot-toast
```

### Step 2: Update AuditForm to Use New Services

Replace the direct axios call with the new API service:

```javascript
// In AuditForm.jsx
import { auditService } from '../services/api';
import { useFormAutoSave } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

// Replace useState with useFormAutoSave
const [formData, setFormData, resetFormData] = useFormAutoSave('auditFormData', {
  text: "",
  paperUsage: "",
  // ... rest of fields
});

// Update handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await auditService.submitAudit({
      ...formData,
      paperUsage: Number(formData.paperUsage),
      // ... convert other fields
    });

    const aiResponse = res.reply;
    const score = extractScore(aiResponse);
    
    toast.success('Audit completed successfully!');
    onResult({ score, response: aiResponse });
  } catch (err) {
    toast.error(err.userMessage || 'Failed to get AI response');
    setError(err.userMessage || 'Failed to get AI response');
  } finally {
    setLoading(false);
  }
};
```

### Step 3: Add Theme Toggle to Navbar

```javascript
// In Navbar.jsx
import { useTheme } from '../hooks/useTheme';

export default function Navbar({ setView }) {
  const [theme, toggleTheme] = useTheme();
  
  return (
    <nav>
      {/* ... existing code ... */}
      <button onClick={toggleTheme}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}
```

### Step 4: Create Environment Files

Create these files manually (they're in .gitignore):

**client/.env.local:**
```
VITE_API_URL=http://localhost:3001
```

**backend/.env:**
```
PORT=3001
GEMINI_KEY=your_key_here
NODE_ENV=development
```

---

## 🏗️ Phase 2: TypeScript Migration

### Step 1: Install TypeScript

```bash
# Frontend
cd client
npm install -D typescript @types/react @types/react-dom @types/node

# Backend
cd backend
npm install -D typescript @types/node @types/express @types/cors
```

### Step 2: Create tsconfig.json

**client/tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Step 3: Rename Files

Rename `.jsx` files to `.tsx` and `.js` files to `.ts`:
- `App.jsx` → `App.tsx`
- `components/*.jsx` → `components/*.tsx`
- `services/api.js` → `services/api.ts`

---

## 🗄️ Phase 3: Database Setup

### Step 1: Choose Database

Recommended: **PostgreSQL with Prisma**

### Step 2: Install Prisma

```bash
cd backend
npm install prisma @prisma/client
npm install -D prisma
```

### Step 3: Initialize Prisma

```bash
npx prisma init
```

### Step 4: Define Schema

**backend/prisma/schema.prisma:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  audits    Audit[]
}

model Audit {
  id              String   @id @default(cuid())
  userId          String?
  user            User?    @relation(fields: [userId], references: [id])
  businessText    String
  paperUsage      Float
  cloudSpending   Float
  remotePercent   Float
  disposableCost  Float
  electricityUsage Float
  wasteVolume     Float
  score           Int
  aiResponse      String
  createdAt       DateTime @default(now())
}
```

### Step 5: Create Migrations

```bash
npx prisma migrate dev --name init
```

---

## 🔐 Phase 4: Authentication

### Step 1: Install Auth Dependencies

```bash
cd backend
npm install jsonwebtoken bcryptjs
npm install -D @types/jsonwebtoken @types/bcryptjs
```

### Step 2: Create Auth Middleware

**backend/middleware/auth.js:**
```javascript
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};
```

### Step 3: Create Auth Routes

**backend/routes/auth.js:**
```javascript
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Register
router.post('/register', async (req, res) => {
  // Implementation
});

// Login
router.post('/login', async (req, res) => {
  // Implementation
});

export default router;
```

---

## 🧪 Phase 5: Testing Setup

### Step 1: Install Testing Dependencies

```bash
cd client
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

cd ../backend
npm install -D jest supertest @types/jest @types/supertest
```

### Step 2: Create Test Files

**client/src/components/__tests__/AuditForm.test.tsx:**
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AuditForm from '../AuditForm';

describe('AuditForm', () => {
  it('renders form fields', () => {
    render(<AuditForm onResult={() => {}} />);
    expect(screen.getByLabelText(/business idea/i)).toBeInTheDocument();
  });
});
```

### Step 3: Add Test Scripts

**package.json:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

---

## 🚀 Phase 6: Deployment

### Option 1: Vercel (Frontend) + Railway (Backend)

1. **Frontend:**
   - Push to GitHub
   - Import to Vercel
   - Add environment variables
   - Deploy

2. **Backend:**
   - Push to GitHub
   - Import to Railway
   - Add environment variables
   - Connect database
   - Deploy

### Option 2: Docker

**Dockerfile (backend):**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - GEMINI_KEY=${GEMINI_KEY}
    env_file:
      - ./backend/.env

  frontend:
    build: ./client
    ports:
      - "5173:5173"
    depends_on:
      - backend
```

---

## 📊 Monitoring Setup

### Step 1: Install Sentry

```bash
cd client
npm install @sentry/react

cd ../backend
npm install @sentry/node
```

### Step 2: Initialize Sentry

**client/src/main.jsx:**
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_ENV,
});
```

---

## ✅ Checklist

### Quick Wins
- [ ] Install react-hot-toast
- [ ] Update AuditForm to use API service
- [ ] Add theme toggle
- [ ] Create environment files
- [ ] Add form auto-save

### Foundation
- [ ] TypeScript migration
- [ ] API client layer (✅ Done)
- [ ] Environment configuration
- [ ] Input validation
- [ ] Error handling

### Core Features
- [ ] Database setup
- [ ] User authentication
- [ ] Audit history
- [ ] Export functionality

### Polish
- [ ] PWA features
- [ ] Loading states
- [ ] Responsive design
- [ ] Testing suite

---

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured correctly
   - Check VITE_API_URL matches backend URL

2. **Environment Variables Not Working**
   - Restart dev server after adding .env files
   - Use `import.meta.env.VITE_*` prefix for Vite

3. **TypeScript Errors**
   - Run `npm run build` to see all type errors
   - Gradually fix types, don't use `any` everywhere

4. **Database Connection**
   - Check DATABASE_URL format
   - Ensure database is running
   - Run migrations: `npx prisma migrate dev`

---

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Testing Library](https://testing-library.com/react)
- [Vite Guide](https://vite.dev/guide/)

---

**Happy Coding! 🚀**
