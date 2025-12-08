# Django Backend CORS Setup

## Quick Fix - Add to your Django settings.py

```python
# settings.py

# 1. Install django-cors-headers if not already installed
# pip install django-cors-headers

# 2. Add to INSTALLED_APPS
INSTALLED_APPS = [
    # ... your other apps
    'rest_framework',
    'corsheaders',  # Add this
]

# 3. Add CORS middleware (MUST be near the top)
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add this FIRST
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ... rest of your middleware
]

# 4. CORS Configuration
import os

# For development - allow specific origins
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '').split(',') or [
    "http://localhost:3030",
    "http://127.0.0.1:3030",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# OR for quick testing (NOT for production):
# CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

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

## Environment Variables Approach

1. Create a `.env` file in your Django project root (next to manage.py):

```bash
# .env
CORS_ALLOWED_ORIGINS=http://localhost:3030,http://127.0.0.1:3030,http://localhost:5173,http://127.0.0.1:5173
DEBUG=True
```

2. Install python-decouple:

```bash
pip install python-decouple
```

3. Update your settings.py:

```python
from decouple import config

# CORS Configuration from environment
cors_origins = config('CORS_ALLOWED_ORIGINS', default='')
CORS_ALLOWED_ORIGINS = [origin.strip() for origin in cors_origins.split(',') if origin.strip()]

# If no environment variable set, use these defaults
if not CORS_ALLOWED_ORIGINS:
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:3030",
        "http://127.0.0.1:3030",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

CORS_ALLOW_CREDENTIALS = True
```

## Verify CORS is Working

After making these changes:

1. **Restart your Django server**
2. **Try the login again**
3. **Check browser console** - you should see:
   - OPTIONS request (200 OK) ✓
   - POST request (200 OK or 401 if wrong credentials) ✓
4. **Check Network tab response headers** should include:
   - `Access-Control-Allow-Origin: http://localhost:3030`
   - `Access-Control-Allow-Credentials: true`

## Common Issues

### Issue: Still getting CORS error after configuration

**Solution:**
- Make sure you restarted Django server after changes
- Check middleware order - CorsMiddleware must be FIRST
- Verify django-cors-headers is installed: `pip show django-cors-headers`

### Issue: OPTIONS returns 200 but POST returns CORS error

**Solution:**
- Add `CORS_ALLOW_CREDENTIALS = True`
- Make sure your frontend URL matches exactly (check port number)
- Check if you have any other middleware blocking the request

### Issue: CORS works but login fails with 401

**Solution:**
- This is good! CORS is working
- Check your credentials are correct
- Check Django logs for authentication errors

## Quick Test Commands

Test your endpoints with curl:

```bash
# Test OPTIONS (preflight)
curl -X OPTIONS http://127.0.0.1:8000/api/auth/login/ \
  -H "Origin: http://localhost:3030" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type" \
  -v

# Test actual login
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3030" \
  -d '{"email": "test@example.com", "password": "test123"}' \
  -v
```

Look for these headers in the response:
- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Credentials`
- `Access-Control-Allow-Methods`
