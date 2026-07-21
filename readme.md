# Visionary AI 🎨

Visionary AI is a full-stack AI image generation web application where users can sign up, log in, and generate high-quality AI images from text prompts.

## ✨ Features

- 🔐 User Authentication (Signup & Login)
- 🤖 AI-powered image generation
- 📝 Generate images from text prompts
- 💾 Store user-generated images
- 📱 Responsive UI
- ⚡ Fast and simple user experience

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Context API
- CSS

### Backend

- Node.js
- Express.js
- TypeScript

### AI Image Generation

- ClipDrop Text-to-Image API

### Database

- MongoDB

---

## 🚀 How It Works

1. User creates an account or logs in.
2. User enters a text prompt.
3. The backend sends the prompt to the ClipDrop Text-to-Image API.
4. AI generates an image.
5. The generated image is returned to the frontend and displayed to the user.

---

## 📂 Project Structure

```
visionary-ai/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── ...
│
├── backend/
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── ...
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIPDROP_API_KEY=your_clipdrop_api_key
```

---

## 📦 Installation

### Clone the repository

```bash
git clone https://github.com/your-username/visionary-ai.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 API Used

**ClipDrop Text-to-Image API**

Endpoint:

```
https://clipdrop-api.co/text-to-image/v1
```

The backend sends the user's text prompt to the API using `multipart/form-data` and returns the generated image to the frontend.

---

## 📸 Screenshots

Add screenshots here.

- Login Page
- Signup Page
- Dashboard
- AI Image Generator

---

## 🔮 Future Improvements

- Image history
- Download generated images
- Favorite images
- Prompt history
- Multiple AI models
- Image variations
- Dark mode

---

## 👨‍💻 Author

**Hassan Ashraf**

https://github.com/MohdHassanash01/Visionary-AI

---

