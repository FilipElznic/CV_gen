# Firebase Setup Guide for CV Generator

## 🔥 Firebase Firestore Setup Instructions

### 1. **Enable Firestore Database**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `cv-builder-9931b`
3. Click on **"Firestore Database"** in the left sidebar
4. Click **"Create database"**
5. Choose **"Start in test mode"** (for development)
6. Select your preferred location (e.g., us-central1)

### 2. **Configure Firestore Security Rules**

In the Firebase Console > Firestore Database > Rules tab, use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own CVs
    match /cvs/{cvId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }

    // Allow anyone to read public CVs
    match /cvs/{cvId} {
      allow read: if resource.data.isPublic == true;
    }
  }
}
```

### 3. **Enable Authentication**

1. Go to **Authentication** in the Firebase Console
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable **"Email/Password"** provider
5. Save the changes

### 4. **Test the Connection**

After setup, try saving a CV in your app. Check the browser console for any error messages.

## 🚨 Common Issues & Solutions

### Issue: "FirebaseError: Missing or insufficient permissions"

**Solution:** Update Firestore security rules as shown above

### Issue: "FirebaseError: The Cloud Firestore API is not available"

**Solution:** Enable Firestore database in Firebase Console

### Issue: "Network error" or "WebChannelConnection RPC 'Write' stream errored"

**Solutions:**

- Check your internet connection
- Disable browser extensions (especially ad blockers)
- Try in incognito mode
- Clear browser cache and cookies

### Issue: "User not authenticated"

**Solution:** Make sure you're logged in to the app before trying to save

## 🔍 Debugging Steps

1. **Check Browser Console**: Look for specific error messages
2. **Verify Authentication**: Make sure you're logged in
3. **Check Network Tab**: Look for failed Firebase requests
4. **Verify Environment Variables**: Ensure .env file has correct values
5. **Test Firebase Connection**: Try the connection test button in the app

## 📱 Development Mode Setup

For development, you can start with these more permissive rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // WARNING: Only for development!
    }
  }
}
```

**⚠️ Important:** Change these rules before deploying to production!
