This is the Fullstack blog website built using **Node.js**, **Express**, **MongoDB**, **EJS** and **Passport.js** for authentication. It includes support for cloud storage using **Cloudinary** and handles file uploads using **Multer**.

---

## 🚀 Features

- User authentication with Passport and MongoDB
- File uploads to Cloudinary
- Session management with `express-session` and `connect-mongo`
- EJS-based views support
- Flash messages for alerts

---

## 🛠️ Tech Stack

- **Node.js** (v23.5.0)
- **Express.js**
- **MongoDB** + **Mongoose**
- **Cloudinary** for media uploads
- **Passport.js** for authentication
- **EJS** for templating
- **Multer** for handling form data
- **dotenv** for environment config

---

## 📁 Project Structure

- `app.js` – Main Express app
- `cloudConfig.js` – Cloudinary setup
- `routes/` – Contains route files like `auth.js`
- `models/` – Mongoose schemas
- `views/` – EJS templates
- `public/` – Static files (CSS, images)

---

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd Backend
```

2.Install dependencies:
```bash
npm install
```

3.Create a .env file in the root with:
```bash
DB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SECRET=your_session_secret
```

4.Start the development server:
```bash
node app.js
```
