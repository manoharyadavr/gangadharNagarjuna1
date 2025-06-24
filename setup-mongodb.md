# 🚀 Quick MongoDB Atlas Setup

## Step 1: Create Free MongoDB Atlas Account
1. Go to: https://www.mongodb.com/atlas
2. Click "Try Free"
3. Create account with email

## Step 2: Create Database
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Choose "AWS" and "N. Virginia (us-east-1)"
4. Click "Create"

## Step 3: Create Database User
1. Username: `auraelite`
2. Password: `AuraElite2024!`
3. Click "Create User"

## Step 4: Get Connection String
1. Click "Connect"
2. Choose "Connect your application"
3. Copy the connection string

## Step 5: Update .env File
Replace the MONGODB_URI in your .env file with:
```
MONGODB_URI=mongodb+srv://auraelite:AuraElite2024!@cluster0.xxxxx.mongodb.net/aura-elite?retryWrites=true&w=majority
```

## Step 6: Restart Server
```bash
npm run dev:server
```

## Step 7: Create Admin User
```bash
npm run create-admin
```

## Step 8: Test Application
- Frontend: http://localhost:8083
- Admin: http://localhost:8083/admin/login
- Login: admin@example.com / admin123

## 🎯 Alternative: Use Local MongoDB
If you prefer local MongoDB:
1. Download from: https://www.mongodb.com/try/download/community
2. Install and start service
3. Use: `MONGODB_URI=mongodb://localhost:27017/aura-elite` 