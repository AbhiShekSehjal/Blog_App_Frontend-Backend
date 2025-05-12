This is the Fullstack blog website built using **Node.js**, **Express**, **MongoDB**,**EJS** and **Passport.js** for authentication. It includes support for cloud storage using **Cloudinary** and handles file uploads using **Multer**.

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

Backend/
├── app.js # Main Express app setup
├── cloudConfig.js # Cloudinary configuration
├── .env # Environment variables
├── package.json # Project metadata and dependencies
├── public/ # Static files (if present)
├── routes/ # Express route handlers
├── models/ # Mongoose schemas
├── views/ # EJS templates
└── ...


---

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd Backend

2.Install dependencies:

npm install

3.Create a .env file in the root with:

DB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SECRET=your_session_secret

4.Start the development server:

node app.js

 License
This project is licensed under the ISC License.


Would you like help with the frontend `README` as well, if it's part of your project? ​:contentReference[oaicite:0]{index=0}​
