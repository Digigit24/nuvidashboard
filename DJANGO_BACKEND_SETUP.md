# Django Backend Integration Guide

## Overview

The frontend is now configured to connect to your Django backend running at `http://127.0.0.1:8000/api`.

## API Endpoints Configuration

The following endpoints are configured in `client/src/lib/api-config.ts`:

```typescript
POST http://127.0.0.1:8000/api/auth/login/
POST http://127.0.0.1:8000/api/auth/logout/
POST http://127.0.0.1:8000/api/auth/register/
GET  http://127.0.0.1:8000/api/auth/user/
PUT  http://127.0.0.1:8000/api/auth/user/update/
```

## Django Backend Requirements

### 1. CORS Configuration

Your Django backend **MUST** allow CORS requests from your frontend. Add the following to your Django settings:

```python
# settings.py

INSTALLED_APPS = [
    # ... other apps
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add this at the top
    'django.middleware.common.CommonMiddleware',
    # ... other middleware
]

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173",
    "http://localhost:3030",  # Your app server
    "http://127.0.0.1:3030",
]

# Or for development, allow all (NOT for production):
# CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
```

### 2. Install django-cors-headers

```bash
pip install django-cors-headers
```

### 3. Expected Response Format

The Django backend should return responses in this format:

#### Login Response (POST /api/auth/login/)
```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "full_name": "User Name",
    "phone": "+1234567890",
    "role": "Patient"
  },
  "token": "jwt-token-here"
}
```

#### Register Response (POST /api/auth/register/)
```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "full_name": "User Name",
    "phone": "+1234567890",
    "role": "Patient"
  },
  "token": "jwt-token-here"
}
```

#### Get User Response (GET /api/auth/user/)
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "full_name": "User Name",
  "phone": "+1234567890",
  "role": "Patient"
}
```

OR

```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "full_name": "User Name",
    "phone": "+1234567890",
    "role": "Patient"
  }
}
```

### 4. Request Format

The frontend sends data in this format:

#### Login Request
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Register Request
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "User Name",
  "phone": "+1234567890",
  "role": "Patient"
}
```

## Testing the Connection

### 1. Check Django Server is Running

```bash
python manage.py runserver 0.0.0.0:8000
```

Verify you can access: http://127.0.0.1:8000/api/auth/login/

### 2. Test API Endpoints with curl

#### Test Login
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

#### Test Registration
```bash
curl -X POST http://127.0.0.1:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User",
    "phone": "+1234567890",
    "role": "Patient"
  }'
```

### 3. Check Browser Console

When you try to login from the frontend, open the browser console (F12) and check for:

1. **Network tab**: Look for the request to `http://127.0.0.1:8000/api/auth/login/`
   - Check if the request is being sent
   - Check the response status code
   - Check the response body

2. **Console tab**: Look for console.log messages:
   - "Attempting login to: http://127.0.0.1:8000/api/auth/login/"
   - "Login response status: 200" (or error code)
   - "Login successful, received data: {...}"

## Common Issues and Solutions

### Issue 1: CORS Error

**Error in console:**
```
Access to fetch at 'http://127.0.0.1:8000/api/auth/login/' from origin 'http://localhost:3030'
has been blocked by CORS policy
```

**Solution:**
- Install and configure django-cors-headers (see section 1 above)
- Make sure CORS middleware is at the top of MIDDLEWARE list
- Add your frontend URL to CORS_ALLOWED_ORIGINS

### Issue 2: Connection Refused

**Error in console:**
```
Failed to fetch
net::ERR_CONNECTION_REFUSED
```

**Solution:**
- Make sure Django server is running on port 8000
- Check Django is accessible at http://127.0.0.1:8000

### Issue 3: 404 Not Found

**Error:**
```
POST http://127.0.0.1:8000/api/auth/login/ 404 (Not Found)
```

**Solution:**
- Check your Django URLs configuration
- Make sure the auth endpoints are correctly routed
- Verify the URL path in Django matches exactly

### Issue 4: 401 Unauthorized

**Error:**
```
POST http://127.0.0.1:8000/api/auth/login/ 401 (Unauthorized)
```

**Solution:**
- Check that the user exists in the database
- Verify the password is correct
- Check Django authentication logic

### Issue 5: Response Format Mismatch

**Error in console:**
```
Cannot read property 'user' of undefined
```

**Solution:**
- Check the response format matches the expected format (see section 3)
- The frontend expects `{ user: {...}, token: "..." }` for login/register
- Adjust your Django serializer to match this format

## Debugging Checklist

1. ✅ Django server is running on port 8000
2. ✅ CORS is properly configured
3. ✅ django-cors-headers is installed
4. ✅ Frontend is running (npm run dev)
5. ✅ Browser console shows the login attempt
6. ✅ Network tab shows the request is sent
7. ✅ Django logs show the request received
8. ✅ Response format matches expected format

## Environment Variables

If you need to change the API base URL, update `client/src/lib/api-config.ts`:

```typescript
export const API_BASE_URL = 'http://127.0.0.1:8000/api';
```

For production, you might want to use environment variables:

```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
```

Then create a `.env` file:
```
VITE_API_BASE_URL=https://your-production-api.com/api
```

## Next Steps

After successful authentication:

1. The JWT token is stored in localStorage as 'authToken'
2. All subsequent API requests should include: `Authorization: Bearer <token>`
3. The useApi hook automatically includes the token in requests
4. Protected routes check authentication status before rendering

## Support

If you continue to have issues:

1. Check the browser console for detailed error messages
2. Check Django server logs
3. Use the Network tab to inspect request/response
4. Verify Django and frontend are both running
5. Test the Django API directly with curl or Postman first
