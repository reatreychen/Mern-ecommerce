# MERN E-commerce Deployment Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account for image uploads
- Google Cloud Console account for OAuth
- Deployment platform (Vercel, Netlify, Railway, etc.)

## Environment Variables Setup

### Backend Environment Variables (.env)
```env
# Database
URL_DB=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority

# JWT Secrets (Generate strong random strings)
SECRET_KEY_ACCESS_TOKEN=your-very-long-secure-access-token-secret-key-here
SECRET_KEY_REFRESH_TOKEN=your-very-long-secure-refresh-token-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
BACKEND_URL=https://your-backend-domain.com

# Cloudinary
CLOUDINARY_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# CORS & Security
FRONTEND_URLS=https://your-frontend-domain.com
NODE_ENV=production
ALLOW_ALL_CORS=false
PORT=8080
```

### Frontend Environment Variables (.env)
```env
VITE_API_URL=https://your-backend-domain.com
```

## Deployment Steps

### 1. Backend Deployment

#### Option A: Railway/Render/Heroku
1. Connect your GitHub repository
2. Set environment variables in the platform dashboard
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Deploy

#### Option B: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Create `vercel.json` in backend folder:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

### 2. Frontend Deployment

#### Option A: Vercel (Recommended)
1. Connect GitHub repository
2. Set environment variables
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

#### Option B: Netlify
1. Connect GitHub repository
2. Set environment variables
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

## Security Checklist

### ✅ Implemented
- [x] Helmet security headers
- [x] CORS configuration
- [x] JWT authentication
- [x] Password hashing
- [x] Rate limiting
- [x] Environment variables

### ⚠️ Additional Recommendations
- [ ] Add input validation middleware
- [ ] Implement request logging
- [ ] Set up monitoring (Sentry, etc.)
- [ ] Configure HTTPS redirects
- [ ] Set up database backups
- [ ] Add API documentation

## Google OAuth Setup

1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://your-backend-domain.com/google/callback`
4. Copy Client ID and Client Secret to environment variables

## Cloudinary Setup

1. Create Cloudinary account
2. Get cloud name, API key, and API secret
3. Add to environment variables

## Testing Deployment

1. Test user registration/login
2. Test Google OAuth
3. Test image uploads
4. Test all CRUD operations
5. Test payment flow
6. Verify CORS works correctly

## Common Issues

### CORS Errors
- Ensure `FRONTEND_URLS` includes your frontend domain
- Check that `ALLOW_ALL_CORS` is set to `false` in production

### JWT Token Issues
- Verify JWT secrets are strong and unique
- Check token expiration settings

### Database Connection
- Ensure MongoDB connection string is correct
- Check network access from deployment platform

### Image Uploads
- Verify Cloudinary credentials
- Check file size limits

## Performance Optimization

1. Enable compression middleware
2. Implement caching strategies
3. Optimize database queries
4. Use CDN for static assets
5. Enable gzip compression

## Monitoring

Consider setting up:
- Application performance monitoring (APM)
- Error tracking (Sentry)
- Uptime monitoring
- Database monitoring
- Log aggregation
