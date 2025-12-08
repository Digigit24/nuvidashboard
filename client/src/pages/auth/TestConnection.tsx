import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { API_ENDPOINTS } from '@/lib/api-config';

export default function TestConnection() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult('Testing connection...\n\n');

    try {
      // Test 1: Check if we can reach the API
      setResult(prev => prev + `Testing: ${API_ENDPOINTS.auth.login}\n`);

      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'test123'
        }),
      });

      setResult(prev => prev + `Response Status: ${response.status}\n`);
      setResult(prev => prev + `Response Status Text: ${response.statusText}\n\n`);

      const data = await response.json().catch(() => null);
      setResult(prev => prev + `Response Body:\n${JSON.stringify(data, null, 2)}\n\n`);

      if (response.ok) {
        setResult(prev => prev + '✅ Connection successful!\n');
      } else {
        setResult(prev => prev + '⚠️ Connection successful but authentication failed (expected if user doesn\'t exist)\n');
      }
    } catch (error: any) {
      setResult(prev => prev + `❌ Error: ${error.message}\n\n`);
      setResult(prev => prev + 'Possible issues:\n');
      setResult(prev => prev + '1. Django server is not running on port 8000\n');
      setResult(prev => prev + '2. CORS is not configured properly\n');
      setResult(prev => prev + '3. Firewall is blocking the connection\n');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">API Connection Test</CardTitle>
          <CardDescription>
            Test the connection to your Django backend
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>API Base URL:</strong> {API_ENDPOINTS.auth.login}
            </p>
          </div>

          <Button
            onClick={testConnection}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Testing...' : 'Test Connection'}
          </Button>

          {result && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <pre className="text-xs whitespace-pre-wrap font-mono">
                {result}
              </pre>
            </div>
          )}

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold mb-2">Before testing:</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Make sure Django server is running: <code className="bg-white dark:bg-gray-800 px-1 rounded">python manage.py runserver 0.0.0.0:8000</code></li>
              <li>Make sure CORS is configured in Django settings</li>
              <li>Open browser console (F12) to see detailed logs</li>
            </ol>
          </div>

          <div className="mt-4 text-center">
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              ← Back to Login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
