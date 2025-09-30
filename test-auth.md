# Authentication Integration Test Guide

## Prerequisites
1. Make sure MongoDB is running on localhost:27017
2. Start the API server: `cd api && npm run dev`
3. Start the client: `cd client && npm run dev`

## Test Scenarios

### 1. Signup Flow
1. Navigate to `http://localhost:8080/signup`
2. Fill in all required fields:
   - Full Name: Test User
   - Email: test@example.com
   - Password: TestPassword123!
   - Confirm Password: TestPassword123!
   - Designation: Software Developer
   - Years of Experience: 3
   - Company/Workspace Name: Test Company
3. Click "Create Account & Workspace"
4. Should redirect to dashboard on success

### 2. Login Flow
1. Navigate to `http://localhost:8080/login`
2. Enter credentials:
   - Email: test@example.com
   - Password: TestPassword123!
3. Click "Sign In"
4. Should redirect to dashboard on success

### 3. Route Protection
1. Try accessing `http://localhost:8080/dashboard` without login
2. Should redirect to login page
3. After login, should be able to access protected routes

### 4. Logout Flow
1. While logged in, click on user profile dropdown
2. Click "Logout"
3. Should redirect to login page
4. Should not be able to access protected routes

### 5. Token Refresh
1. Login successfully
2. Wait for access token to expire (15 minutes)
3. Make an API request
4. Should automatically refresh token and continue

## Expected API Endpoints
- POST `/api/auth/signup` - User registration
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout
- POST `/api/auth/refresh` - Token refresh

## Environment Variables
- Client: `VITE_BASE_URL=http://localhost:5000`
- API: Uses `.env` file with MongoDB and JWT configuration
