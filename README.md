# 📄 CV Generator

A modern, full-stack web application for creating, and sharing professional CVs. Built with React and Firebase, featuring an intuitive interface, multiple templates, and powerful sharing capabilities.

![CV Generator](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-9.x-orange?style=for-the-badge&logo=firebase)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.x-blue?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-4.x-purple?style=for-the-badge&logo=vite)

## ✨ Features

### 🎨 **CV Builder**

- Interactive form-based CV creation
- Real-time preview and editing
- Multiple professional templates
- Customizable color schemes
- Drag-and-drop section reordering

### 👤 **User Management**

- Firebase Authentication integration
- Secure user registration and login
- Personal dashboard for CV management
- Profile customization options

### 🌐 **Public Gallery**

- Browse public CVs for inspiration
- Advanced filtering and search capabilities
- Skill-based and location filtering
- Responsive grid layout with detailed views

### 📚 **Educational Resources**

- Interactive CV writing guide with Chart.js visualizations
- ATS optimization tips and best practices
- Data-driven insights on CV effectiveness
- Industry-specific advice and examples

### 📊 **Analytics & Features**

- View tracking for public CVs
- Performance metrics and statistics
- Export capabilities (PDF, sharing links)
- Version control and CV history

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Firebase** account and project
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/FilipElznic/CV_gen.git
   cd CV_gen
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**

   Create a Firebase project at [Firebase Console](https://console.firebase.google.com/) and configure:

   - Authentication (Email/Password provider)
   - Firestore Database
   - Hosting (optional)

   Then update `src/config/firebase.js` with your Firebase configuration:

   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id",
   };
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` to see the application.

## 🏗️ Project Structure

```
src/
├── Components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   ├── HeroSection.jsx # Landing page hero
│   ├── Footer.jsx      # Footer component
│   └── ...             # Other components
├── pages/              # Route-specific pages
│   ├── Home.jsx        # Landing page
│   ├── Create.jsx      # CV creation page
│   ├── Dashboard.jsx   # User dashboard
│   ├── AllCV.jsx       # Public CV gallery
│   └── ...             # Other pages
├── contexts/           # React Context providers
│   └── AuthContext.jsx # Authentication context
├── services/           # API and business logic
│   └── cvService.js    # CV-related API calls
├── config/             # Configuration files
│   └── firebase.js     # Firebase configuration
└── assets/             # Static assets
    └── cvicon.png      # Application icon
```

## 🛠️ Technology Stack

### Frontend

- **React 18** - Modern UI framework with hooks
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization for educational content

### Backend & Database

- **Firebase** - Backend-as-a-Service platform
- **Firestore** - NoSQL document database
- **Firebase Auth** - Authentication service
- **Firebase Hosting** - Web hosting service

### Development Tools

- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Git** - Version control
- **npm** - Package management

### Key Libraries

- **uuid** - Unique identifier generation
- **@tailwindcss/line-clamp** - Text truncation utility
- **React Context API** - State management

## 🎯 Usage Guide

### Creating Your First CV

1. **Sign up** for a new account or **log in** to existing account
2. Navigate to **"Create CV"** from the dashboard
3. Fill in your personal information, experience, education, and skills
4. Choose from available templates and customize colors
5. Preview your CV in real-time
6. Save and optionally make it public for sharing

### Managing CVs

- **View all CVs** in your personal dashboard
- **Edit existing CVs** anytime with full edit capabilities
- **Toggle public/private** visibility for sharing control
- **Export CVs** for offline use or job applications
- **Delete CVs** you no longer need

### Exploring Public Gallery

- **Browse public CVs** for inspiration and ideas
- **Filter by skills**, location, or experience level
- **Use quick filter pills** for common technologies
- **Sort results** by date or alphabetically
- **View detailed information** about each CV

## 📖 API Reference

### CV Service Functions

```javascript
// Create a new CV
createCV(cvData, userId);

// Retrieve all public CVs
getAllPublicCVs();

// Update existing CV
updateCV(cvId, updateData);

// Delete CV
deleteCV(cvId);

// Get user's CVs
getUserCVs(userId);
```

### Authentication Context

```javascript
// Current user state
const { currentUser } = useAuth();

// Authentication methods
signup(email, password);
login(email, password);
logout();
```

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
```

## 🚨 Troubleshooting

### Common Issues

**Firebase Configuration Error**

- Ensure Firebase config is properly set up in `src/config/firebase.js`
- Check that all required Firebase services are enabled

**Authentication Not Working**

- Verify Firebase Authentication is enabled
- Ensure Email/Password provider is configured
- Check Firebase security rules

**Charts Not Displaying**

- Verify Chart.js loads properly
- Check browser console for JavaScript errors
- Ensure canvas element is properly rendered

## 🙏 Acknowledgments

- **Firebase** for providing excellent backend infrastructure
- **Tailwind CSS** for the utility-first CSS framework
- **React** team for the amazing frontend library
- **Chart.js** for beautiful data visualizations
- **Vite** for the lightning-fast development experience

## 📞 Support

If you encounter any issues or have questions:

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/FilipElznic/CV_gen/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/FilipElznic/CV_gen/discussions)
- 📚 **Documentation**: [Project Docs](./src/pages/Docs.jsx)

## 🔗 Links

- **Live Demo**: [CV Generator](https://your-deployment-url.com)
- **Firebase Console**: [Firebase](https://console.firebase.google.com/)
- **React Documentation**: [React Docs](https://react.dev/)
- **Tailwind CSS**: [Tailwind Docs](https://tailwindcss.com/)

---

<div align="center">

**Built with ❤️ by [Filip Elznic](https://github.com/FilipElznic)**

⭐ **Star this repository if you found it helpful!** ⭐

</div>
<div align="center">
  <a href="https://shipwrecked.hackclub.com/?t=ghrm" target="_blank">
    <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/739361f1d440b17fc9e2f74e49fc185d86cbec14_badge.png" 
         alt="This project is part of Shipwrecked, the world's first hackathon on an island!" 
         style="width: 35%;">
  </a>
</div>
