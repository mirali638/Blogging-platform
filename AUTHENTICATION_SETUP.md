# Authentication Setup Guide

## Overview
The authentication system is now fully functional and connected to the backend. It uses JWT tokens for stateless authentication with role-based access control.

## Backend Authentication Files

### Core Files:
- `backend/models/User.js` - User schema with authentication fields
- `backend/controllers/userController.js` - Authentication logic (signup, login, logout, profile)
- `backend/routes/userRoutes.js` - Authentication API endpoints
- `backend/middleware/auth.js` - JWT verification middleware
- `backend/server.js` - Server setup with authentication routes

### API Endpoints:
- `POST /api/userdashboard/users/signup` - User registration
- `POST /api/userdashboard/users/login` - User login
- `POST /api/userdashboard/users/logout` - User logout
- `GET /api/userdashboard/users/profile` - Get user profile (protected)
- `GET /api/userdashboard/users/verify` - Verify JWT token (protected)

## Frontend Authentication Files

### Core Files:
- `frontend/src/hooks/useAuth.js` - Authentication context and hooks
- `frontend/src/pages/Login.jsx` - Login form
- `frontend/src/pages/Register.jsx` - Registration form
- `frontend/src/pages/Logout.jsx` - Logout functionality
- `frontend/src/components/common/ProtectedRoute.jsx` - Route protection
- `frontend/src/utils/api.js` - API configuration with interceptors

## Environment Variables

Create a `.env` file in the backend directory with:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/blogging-platform

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin Configuration
ADMIN_EMAIL=admin@blogplatform.com

# Server Configuration
PORT=5000
NODE_ENV=development
```

## Features

### ✅ Implemented:
1. **User Registration** - Complete signup process
2. **User Login** - JWT-based authentication
3. **User Logout** - Proper token cleanup
4. **Protected Routes** - Role-based access control
5. **Token Verification** - Automatic token validation
6. **Error Handling** - Comprehensive error management
7. **Loading States** - User feedback during operations
8. **Admin Role** - Special admin privileges

### 🔐 Security Features:
- Password hashing with bcrypt
- JWT token expiration (1 hour)
- Automatic token refresh validation
- Role-based access control
- CORS protection
- Input validation

## Usage

### Registration:
```javascript
const { register } = useAuth();
await register({ username: "john", email: "john@example.com", password: "password123" });
```

### Login:
```javascript
const { login } = useAuth();
const result = await login({ email: "john@example.com", password: "password123" });
// result.redirectUrl will contain the appropriate dashboard URL
```

### Logout:
```javascript
const { logout } = useAuth();
await logout();
```

### Protected Routes:
```javascript
import ProtectedRoute from './components/common/ProtectedRoute';

// For any user
<ProtectedRoute>
  <UserDashboard />
</ProtectedRoute>

// For admin only
<ProtectedRoute role="admin">
  <AdminDashboard />
</ProtectedRoute>
```

### Access User Data:
```javascript
const { user, isAuthenticated, loading } = useAuth();

if (loading) return <div>Loading...</div>;
if (!isAuthenticated) return <div>Please log in</div>;

console.log(user.username, user.role);
```

## Authentication Flow

1. **Registration**: User fills form → Backend validates → Creates user → Redirects to login
2. **Login**: User enters credentials → Backend verifies → Returns JWT → Stores in localStorage → Redirects to dashboard
3. **Protected Access**: Component checks auth state → Verifies token → Allows/denies access
4. **Logout**: Clears localStorage → Calls backend logout → Redirects to login

## Testing

1. Start the backend server: `cd backend && npm start`
2. Start the frontend: `cd frontend && npm start`
3. Navigate to `http://localhost:3000/register` to create an account
4. Login at `http://localhost:3000/login`
5. Test protected routes and admin functionality

## Notes

- Admin users are automatically assigned based on the `ADMIN_EMAIL` environment variable
- JWT tokens expire after 1 hour and require re-login
- All API calls automatically include the JWT token in headers
- Invalid/expired tokens automatically redirect to login
- The system supports both user and admin roles with different dashboards 