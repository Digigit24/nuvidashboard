# Authentication System Integration

This document describes the authentication system integrated into the NuviDashboard application.

## Overview

A comprehensive authentication system has been implemented with the following features:
- User registration and login
- JWT-based token authentication
- Role-based access control (Patient, Doctor, Admin)
- Protected routes
- User profile management

## Architecture

### Backend (Node.js/Express/TypeScript)

#### Database Schema (`shared/schema.ts`)
The user model includes:
- `id`: Unique identifier
- `email`: User email (unique, used for login)
- `password`: Hashed password
- `fullName`: User's full name
- `phone`: Optional phone number
- `role`: One of "Patient", "Doctor", or "Admin"
- `isActive`: Account status
- `createdAt`: Account creation timestamp

#### Authentication Endpoints (`server/auth.ts`)

| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|----------------|
| `/api/auth/register` | POST | Create new user account | No |
| `/api/auth/login` | POST | Login and receive JWT token | No |
| `/api/auth/user` | GET | Get current user info | Yes |
| `/api/auth/user` | PUT | Update user profile | Yes |
| `/api/auth/logout` | POST | Logout | Yes |

#### Security Features
- Passwords hashed using bcrypt
- JWT tokens with 7-day expiration
- Token validation middleware
- Input validation using Zod schemas

### Frontend (React/TypeScript)

#### Auth Context (`client/src/contexts/AuthContext.tsx`)
Provides global authentication state:
- `user`: Current authenticated user
- `token`: JWT token
- `isLoading`: Loading state
- `login(email, password)`: Login function
- `register(data)`: Registration function
- `logout()`: Logout function
- `isAuthenticated`: Boolean authentication status
- `hasRole(roles)`: Check if user has specific role(s)

#### Protected Routes (`client/src/components/ProtectedRoute.tsx`)
Wrapper component that:
- Checks authentication status
- Validates role-based access
- Redirects unauthenticated users to login
- Shows loading state during auth check
- Displays access denied for insufficient permissions

#### Pages

**Login Page** (`client/src/pages/auth/Login.tsx`)
- Email and password fields
- Error handling with toast notifications
- Auto-redirect to dashboard on success
- Link to registration page

**Register Page** (`client/src/pages/auth/Register.tsx`)
- Full registration form with:
  - Email
  - Password (with confirmation)
  - Full name
  - Phone (optional)
  - Role selection
- Input validation
- Error handling
- Auto-redirect to dashboard on success

## Usage

### Creating a New User

```typescript
import { useAuth } from '@/contexts/AuthContext';

function RegisterComponent() {
  const { register } = useAuth();

  const handleRegister = async () => {
    await register({
      email: 'user@example.com',
      password: 'securepassword',
      fullName: 'John Doe',
      phone: '+1234567890',
      role: 'Patient'
    });
  };
}
```

### Logging In

```typescript
import { useAuth } from '@/contexts/AuthContext';

function LoginComponent() {
  const { login } = useAuth();

  const handleLogin = async () => {
    await login('user@example.com', 'securepassword');
  };
}
```

### Protecting Routes

```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute';

function App() {
  return (
    <Route path="/admin">
      <ProtectedRoute allowedRoles={['Admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    </Route>
  );
}
```

### Checking User Role

```typescript
import { useAuth } from '@/contexts/AuthContext';

function Component() {
  const { hasRole, user } = useAuth();

  if (hasRole('Admin')) {
    // Show admin-only content
  }

  if (hasRole(['Doctor', 'Admin'])) {
    // Show content for doctors and admins
  }
}
```

### Making Authenticated API Requests

```typescript
import { useApi } from '@/hooks/useApi';

function Component() {
  const { apiRequest } = useApi();

  const fetchData = async () => {
    const data = await apiRequest('/api/some-endpoint', {
      method: 'GET',
      requiresAuth: true
    });
  };
}
```

## Role-Based Access

The system supports three roles:

### Patient
- Default role for new users
- Access to patient dashboard
- Can view and manage their own health data
- Can book consultations

### Doctor
- Access to doctor dashboard
- Can view patient information
- Can manage consultations
- Additional medical tools

### Admin
- Full system access
- User management
- System configuration
- Analytics and reporting

## Authentication Flow

1. User visits the application
2. If not authenticated, redirected to `/login`
3. User enters credentials or registers
4. Backend validates credentials and returns JWT token
5. Token stored in localStorage
6. Token included in all authenticated requests via Authorization header
7. Protected routes check authentication status before rendering
8. User can logout, which clears token and redirects to login

## Security Considerations

### Production Checklist
- [ ] Change JWT_SECRET to a strong, unique value (use environment variable)
- [ ] Enable HTTPS for all communications
- [ ] Implement rate limiting on auth endpoints
- [ ] Add refresh token mechanism for long-lived sessions
- [ ] Implement account lockout after failed login attempts
- [ ] Add email verification for new accounts
- [ ] Implement password reset functionality
- [ ] Add CSRF protection
- [ ] Enable secure, httpOnly cookies for token storage (instead of localStorage)
- [ ] Implement proper session management
- [ ] Add audit logging for authentication events

## Future Enhancements

- Two-factor authentication (2FA)
- OAuth integration (Google, Facebook, etc.)
- Session management dashboard
- Password strength requirements
- Account recovery via email
- Remember me functionality
- Activity logs and login history
- Account suspension/deactivation
- Role permission granularity

## Testing

### Manual Testing Steps

1. **Registration**
   - Navigate to `/register`
   - Fill in all required fields
   - Submit form
   - Verify auto-login and redirect to dashboard

2. **Login**
   - Navigate to `/login`
   - Enter valid credentials
   - Verify successful login and redirect

3. **Protected Routes**
   - Try accessing `/dashboard/*` without authentication
   - Verify redirect to login page
   - Login and verify access granted

4. **Role-Based Access**
   - Create users with different roles
   - Verify each role has appropriate access

5. **Logout**
   - Click logout in user menu
   - Verify redirect to login
   - Verify dashboard is inaccessible

## Troubleshooting

### Token Expired
- User will be automatically logged out
- Need to login again to get new token

### CORS Issues
- Ensure frontend and backend are on same domain in production
- Configure CORS properly for development

### Token Not Persisting
- Check localStorage in browser dev tools
- Ensure `authToken` key exists after login
- Clear browser cache if issues persist

## API Examples

### Register a New User
```bash
curl -X POST http://localhost:3030/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "phone": "+1234567890",
    "role": "Patient"
  }'
```

### Login
```bash
curl -X POST http://localhost:3030/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:3030/api/auth/user \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Conclusion

The authentication system provides a solid foundation for secure user management with role-based access control. It follows industry best practices and can be extended for additional features as needed.
